import React, {useState} from "react";
import styles from './ProductsList.module.css';
import {SearchField} from "../../../searchField/SearchField";
import {Button} from "../../../button/Button";
import {Table} from "../../../table/Table";
import {UpperBar} from "../../../upperBar/UpperBar";
import {Pagination} from "../../../pagination/Pagination";
import {ProductStatus} from "../productStatus/ProductStatus";
import MaterialIcon from 'material-icons-react';
import {PRODUCTS_LIST} from "../../../../utils/mockData";
import {reorderWithPriority} from "../../../../utils/functools";
import {useAppDispatch} from "../../../../hooks";
import {updatePageName} from "../../../../features/dashboard/dashboardSlice";
import {DASHBOARD_PAGES} from "../../../../types/types";

interface StatusOrder {
    [key: string]: number,
}

export function ProductsList() {
    const productStatus: string[] = ['All products', 'New', 'Used', 'Refurbished']
    const dispatch = useAppDispatch()
    const statusOrder: StatusOrder = {"New": 1, "Used": 2, "Refurbished": 3}
    const columns = ['id', 'image', 'name', 'stock', 'make', 'model', 'supplier', 'total', 'date', 'status']
    const [productStatusActiveIndex, setProductStatusActiveIndex] = useState(0);
    const [productsList, setProductsList] = useState(PRODUCTS_LIST);
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <UpperBar title="Products List"
                          subtitle="100 products found"
                          left="635px"
                          components={[<SearchField/>]}/>
            </div>
            <div className={styles.body}>
                <div className={styles.largeCardContainer}>
                    <div>
                        <div className={styles.productStatus}>
                            {productStatus.map((status, index) => {
                                return <ProductStatus title={status}
                                                      isActive={index === productStatusActiveIndex} key={index}
                                                      handleClick={() => {
                                                          setProductStatusActiveIndex(index)
                                                          setProductsList(
                                                              reorderWithPriority(productsList, "status", productStatus[index])
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
                        <Table data={productsList}
                               columns={columns}/>
                    </div>
                    <div className={styles.footerContainer}>
                        <div className={styles.footerText}>
                            <p>Showing 1 to 100 entries</p>
                        </div>
                        <div>
                            <Pagination numberOfPages={7}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}