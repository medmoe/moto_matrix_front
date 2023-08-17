import React, {useEffect, useState} from "react";
import styles from './ProductsList.module.css';
import {SearchField} from "../../../searchField/SearchField";
import {Button} from "../../../button/Button";
import {Table} from "../../../table/Table";
import {UpperBar} from "../../../upperBar/UpperBar";
import {Pagination} from "../../../pagination/Pagination";
import {ProductStatus} from "../productStatus/ProductStatus";
import MaterialIcon from 'material-icons-react';
import {getUniqueKey, reorderWithPriority} from "../../../../utils/functools";
import {useAppDispatch} from "../../../../hooks";
import {updateActiveIndex, updatePageName} from "../../../../features/dashboard/dashboardSlice"
import {AutoPartDetail, inventoryTableColumnsMapping} from "../../../../types/productTypes";
import {API, PRODUCT_LIST_PAGE_SIZE} from "../../../../constants";
import {ResponseStatusCodes} from "../../../../types/generalTypes";
import {DASHBOARD_PAGES} from "../../../../types/dashboardTypes";
import axios from "axios";
import {Spinner} from "../../../spinner/Spinner";
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
    const numberOfPages = Math.ceil(autoPartsList.autoPartCount / PRODUCT_LIST_PAGE_SIZE)

    const fetchAutoParts = async (url: string | null) => {
        if (!url) return;
        await axios.get(url, {withCredentials: true})
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
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <UpperBar title="Products List"
                          subtitle="100 products found"
                          left="635px"
                          components={[<SearchField/>]}/>
            </div>
            <div className={styles.body}>
                {isLoading ? <Spinner width={"140px"} height={"140px"}/> :
                    <div className={styles.largeCardContainer}>
                        <div>
                            <div className={styles.productStatus}>
                                {productStatus.map((status, index) => {
                                    return <ProductStatus title={status}
                                                          isActive={index === productStatusActiveIndex}
                                                          key={getUniqueKey()}
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
                                <Button label="Add Product"
                                        height="40px"
                                        width="130px"
                                        icon={<MaterialIcon icon="add" size={24} color="#fff"/>}
                                        backgroundColor="#007bff"
                                        textColor="#fff"
                                        border="none"
                                        handleClick={() => dispatch(updatePageName(DASHBOARD_PAGES.ADD_PRODUCT))}/>
                            </div>
                        </div>
                        <div className={styles.tableContainer}>
                            <Table<AutoPartDetail> data={autoPartsList.autoParts}
                                                   tableColumnsMapping={inventoryTableColumnsMapping}/>
                        </div>
                        <div className={styles.footerContainer}>
                            <div className={styles.footerText}>
                                <p>Showing 1 to {autoPartsList.autoPartCount}</p>
                            </div>
                            <div>
                                <Pagination
                                    numberOfPages={numberOfPages}
                                    getPage={activatePage}
                                    activePage={activePage}
                                    goToNextPage={goToNextPage}
                                    goToPreviousPage={goToPreviousPage}
                                    count={autoPartsList.autoPartCount}
                                />
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}