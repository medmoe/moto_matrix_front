import React, {useEffect, useState} from "react";
import styles from './ProductsList.module.css';
import {SearchField} from "../../../searchField/SearchField";
import {Button} from "../../../button/Button";
import {Table} from "../../../table/Table";
import {UpperBar} from "../../../upperBar/UpperBar";
import {Pagination} from "../../../pagination/Pagination";
import {ProductStatus} from "../productStatus/ProductStatus";
import MaterialIcon from 'material-icons-react';
import {reorderWithPriority} from "../../../../utils/functools";
import {useAppDispatch} from "../../../../hooks";
import {updatePageName} from "../../../../features/dashboard/dashboardSlice";
import {API, AutoPartDetail, DASHBOARD_PAGES} from "../../../../types/types";
import axios from "axios";
import {Spinner} from "../../../spinner/Spinner";

interface StatusOrder {
    [key: string]: number,
}

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
    const dispatch = useAppDispatch()
    const statusOrder: StatusOrder = {"New": 1, "Used": 2, "Refurbished": 3}
    const columns = [
        "image",
        "name",
        "manufacturer",
        "price",
        "stock",
        "weight",
        "dimensions",
        "location",
        "category",
        "make",
        "model",
        "year",
        "condition",
        "OEM",
        "UPC",
        "description"
    ]
    const [productStatusActiveIndex, setProductStatusActiveIndex] = useState(0);
    const [autoPartsList, setAutoPartsList] = useState<AutoPartsResponse>(autoPartsResponseInitialState)
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        // get the list of products
        const getProductsList = async () => {
            const options = {headers: {'Content-Type': 'application/json'}, withCredentials: true};
            await axios.get(`${API}components/auto-parts/`, options)
                .then((res) => {
                    setAutoPartsList({
                        autoParts: res.data.results,
                        autoPartCount: res.data.count,
                        nextPage: res.data.next,
                        previousPage: res.data.previous
                    })
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setIsLoading(false);
                })
        }
        getProductsList();
    }, [])
    const length: number = autoPartsList.autoParts.length ? autoPartsList.autoParts.length : autoPartsList.autoPartCount ? autoPartsList.autoPartCount : 1; // prevent 0 division
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
                                                          isActive={index === productStatusActiveIndex} key={index}
                                                          handleClick={() => {
                                                              setProductStatusActiveIndex(index)
                                                              setAutoPartsList({
                                                                      ...autoPartsList,
                                                                      autoParts: reorderWithPriority(autoPartsList.autoParts, "status", productStatus[index])
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
                            <Table data={autoPartsList.autoParts}
                                   columns={columns}/>
                        </div>
                        <div className={styles.footerContainer}>
                            <div className={styles.footerText}>
                                <p>Showing 1 to 100 entries</p>
                            </div>
                            <div>
                                <Pagination
                                    numberOfPages={Math.floor(autoPartsList.autoPartCount / length)}/>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}