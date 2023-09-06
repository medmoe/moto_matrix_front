import React, {useEffect, useState} from "react";
import styles from './ProductsList.module.css';
import {Button, SearchField, Spinner, Table, UpperBar} from "../../../../../../components";
import {Pagination} from "../../../../../../components/pagination/Pagination";
import {ProductStatus} from "../productStatus/ProductStatus";
import MaterialIcon from 'material-icons-react';
import {reorderWithPriority} from "../../../../../../utils/functools";
import {useAppDispatch} from "../../../../../../hooks";
import {updateActiveIndex, updatePageName} from "../../../../dashboardSlice"
import {AutoPartDetail, inventoryTableColumnsMapping} from "../../../../../../types/productTypes";
import {API, PRODUCT_LIST_PAGE_SIZE, SPINNER_SIZE} from "../../../../../../constants";
import {ResponseStatusCodes} from "../../../../../../types/generalTypes";
import {DASHBOARD_PAGES} from "../../../../../../types/dashboardTypes";
import axios from "axios";
import {NavigateFunction, useNavigate} from "react-router-dom";

interface AutoPartsResponse {
    autoParts: AutoPartDetail[];
    autoPartCount: number;
    nextPage: string | null;
    previousPage: string | null
}

export function ProductsList() {
    const productStatus: string[] = ['All products', 'New', 'Used', 'Refurbished']
    const autoPartsResponseInitialState: AutoPartsResponse = {
        autoParts: [],
        autoPartCount: 0,
        nextPage: `${API}components/auto-parts/`,
        previousPage: null
    }
    const navigate: NavigateFunction = useNavigate();
    const dispatch = useAppDispatch()

    const [productStatusActiveIndex, setProductStatusActiveIndex] = useState(0);
    const [autoPartsList, setAutoPartsList] = useState<AutoPartsResponse>(autoPartsResponseInitialState)
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [activePage, setActivePage] = useState<number>(1) // first page is active by default
    const [searchText, setSearchText] = useState<string>("");
    const numberOfPages = Math.ceil(autoPartsList.autoPartCount / PRODUCT_LIST_PAGE_SIZE)
    const startingItem: number = PRODUCT_LIST_PAGE_SIZE * (activePage - 1) + 1;
    const endingItem: number = Math.min(PRODUCT_LIST_PAGE_SIZE * activePage, autoPartsList.autoPartCount);

    const fetchAutoParts = async (url: string | null, params: { [key: string]: string } = {}) => {
        if (!url) return;
        await axios.get(url, {withCredentials: true, params: params})
            .then((res) => {
                setAutoPartsList({
                    autoParts: res.data.results,
                    autoPartCount: res.data.count,
                    nextPage: res.data.next,
                    previousPage: res.data.previous
                })
                setIsLoading(false);
                setActivePage(deriveActivePage(res.data.next, res.data.previous));
            })
            .catch((err) => {
                if (err.response && err.response.status === ResponseStatusCodes.Unauthorized) {
                    dispatch(updateActiveIndex(0))
                    navigate('/');
                } else {
                    console.error(err);
                    setIsLoading(false);
                }
            })
    }

    const activatePage = (event: React.MouseEvent<HTMLDivElement>, pageNumber: number) => {
        const url: string | null = `${API}components/auto-parts/?pageSize=${PRODUCT_LIST_PAGE_SIZE}&page=${pageNumber}`;
        void fetchAutoParts(url);
    }

    useEffect(() => {
        void fetchAutoParts(`${API}components/auto-parts/?pageSize=${PRODUCT_LIST_PAGE_SIZE}`);
    }, [])

    const goToNextPage = () => {
        void fetchAutoParts(autoPartsList.nextPage);
    };

    const goToPreviousPage = () => {
        void fetchAutoParts(autoPartsList.previousPage);
    }

    const extractPageNumber = (url: string | null): number => {
        if (!url) return 1;
        const match: RegExpMatchArray | null = url.match(/page=(\d+)/);
        if (!match) return 1;
        return parseInt(match[1], 10)
    }

    const deriveActivePage = (next: string | null, previous: string | null): number => {
        if (!previous) return 1;
        if (next) return extractPageNumber(next) - 1;
        return extractPageNumber(previous) + 1
    }

    const handleChangeOnSearchField = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setSearchText(event.target.value)
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            void fetchAutoParts(`${API}components/search/?pageSize=${PRODUCT_LIST_PAGE_SIZE}`, {'search': searchText})
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <UpperBar title="Products List"
                          subtitle={`${autoPartsList.autoPartCount} products found`}
                          components={[<SearchField handleChangeOnSearchField={handleChangeOnSearchField} handleKeyPress={handleKeyPress}
                                                    key={0}/>]}/>
            </div>
            <div className={styles.body}>
                {isLoading ? <Spinner width={SPINNER_SIZE.width} height={SPINNER_SIZE.height}/> :
                    <div className={styles.largeCardContainer}>
                        <div className={styles.upper}>
                            <div className={styles.productStatus}>
                                {productStatus.map((status, index) => {
                                    return <ProductStatus title={status}
                                                          isActive={index === productStatusActiveIndex}
                                                          key={index}
                                                          handleClick={() => {
                                                              setProductStatusActiveIndex(index)
                                                              setAutoPartsList({
                                                                      ...autoPartsList,
                                                                      autoParts: reorderWithPriority(autoPartsList.autoParts, "condition", productStatus[index].toUpperCase())
                                                                  }
                                                              )
                                                          }}/>
                                })}
                            </div>
                            <div className={styles.btn}>
                                <Button
                                    width={"20%"}
                                    label="Add Product"
                                    icon={<MaterialIcon icon="add" size={24} color="#fff"/>}
                                    backgroundColor="#007bff"
                                    color="#fff"
                                    border="none"
                                    handleClick={() => dispatch(updatePageName(DASHBOARD_PAGES.ADD_PRODUCT))}/>
                            </div>
                        </div>
                        <div className={styles.tableContainer}>
                            <Table<AutoPartDetail> data={autoPartsList.autoParts}
                                                   tableColumnsMapping={inventoryTableColumnsMapping}
                            handleRowDetail={handleRowDetail}/>
                        </div>
                        <div className={styles.footerContainer}>
                            <div className={styles.footerText}>
                                <p>Showing {startingItem} to {endingItem}</p>
                            </div>
                            <div>
                                <Pagination
                                    numberOfPages={numberOfPages}
                                    getPage={activatePage}
                                    activePage={activePage}
                                    goToNextPage={goToNextPage}
                                    goToPreviousPage={goToPreviousPage}
                                />
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}