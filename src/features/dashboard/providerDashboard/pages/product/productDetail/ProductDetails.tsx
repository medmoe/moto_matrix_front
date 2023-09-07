import React from "react";
import {Button, Divider, ProductImages, Rating, UpperBar} from "../../../../../../components";
import {AutoPartDetail} from "../../../../../../types/productTypes";
import styles from './ProductDetails.module.css';
import MaterialIcon from 'material-icons-react';

interface ProductDetailsProps {
    autoPartDetail?: AutoPartDetail
}

const BUTTON_WIDTH = "20%";

export function ProductDetails({autoPartDetail}: ProductDetailsProps) {
    const pen: JSX.Element = <MaterialIcon icon={"edit"} size={35} color={"#fff"}/>
    const defaultValue = "N/A"
    const deleteProduct = () => {

    }
    const cancelUpdate = () => {

    }
    const updateProduct = () => {

    }
    return (
        <div className={styles.container}>
            <div className={styles.upper}>
                <UpperBar title={autoPartDetail?.component.name}
                          subtitle={<Rating rate={4.5}/>}
                          components={[
                              <Button key={0} label={"Delete"} color={"#f00"} backgroundColor={"#fff"} border={"1px solid #ff0000"}
                                      width={BUTTON_WIDTH} handleClick={deleteProduct}/>,
                              <Button key={1} label={"Cancel"} color={"#007bff"} backgroundColor={"#fff"} border={"1px solid #007bff"}
                                      width={BUTTON_WIDTH} handleClick={cancelUpdate}/>,
                              <Button key={2} label={"Update"} color={"#fff"} backgroundColor={"#007bff"} border={"none"} icon={pen}
                                      width={BUTTON_WIDTH} handleClick={updateProduct}/>,
                          ]}/>
            </div>
            <div className={styles.lower}>
                <div className={styles.largeCard}>
                    <div className={styles.firstRow}>
                        <div className={styles.images}>
                            <ProductImages
                                images={['https://picsum.photos/40', "https://picsum.photos/40", 'https://picsum.photos/40', 'https://picsum.photos/40', 'https://picsum.photos/40']}/>
                        </div>
                        <div className={styles.generalInformation}>
                            <div className={styles.row}>
                                <div className={styles.keys}>
                                    <p>Provider:</p>
                                    <p>Manufacturer:</p>
                                    <p>Price:</p>
                                    <p>Stock:</p>
                                    <p>Weight:</p>
                                    <p>Dimensions:</p>
                                    <p>Location:</p>
                                </div>
                                <div className={styles.values}>
                                    <p>{autoPartDetail?.component.provider?.store_name || defaultValue}</p>
                                    <p>{autoPartDetail?.component.manufacturer || defaultValue}</p>
                                    <p>{autoPartDetail?.component.price || defaultValue}</p>
                                    <p>{autoPartDetail?.component.stock || defaultValue}</p>
                                    <p>{autoPartDetail?.component.weight || defaultValue}</p>
                                    <p>{autoPartDetail?.component.dimensions || defaultValue}</p>
                                    <p>{autoPartDetail?.component.location || defaultValue}</p>
                                </div>
                            </div>
                            <Divider width={"90%"}/>
                            <div className={styles.row}>
                                <div className={styles.innerRow}>
                                    <div className={styles.keys}>
                                        <p>Category:</p>
                                        <p>Condition:</p>
                                        <p>OEM number:</p>
                                        <p>UPC number:</p>
                                    </div>
                                    <div className={styles.values}>
                                        <p>{autoPartDetail?.category.toLowerCase() || defaultValue}</p>
                                        <p>{autoPartDetail?.condition.toLowerCase() || defaultValue}</p>
                                        <p>{autoPartDetail?.oem_number || defaultValue}</p>
                                        <p>{autoPartDetail?.upc_number || defaultValue}</p>
                                    </div>
                                </div>
                                <div className={styles.innerRow}>
                                    <div className={styles.keys}>
                                        <p>Vehicle make:</p>
                                        <p>Vehicle model:</p>
                                        <p>Vehicle year:</p>
                                    </div>
                                    <div className={styles.values}>
                                        <p>{autoPartDetail?.vehicle_make || defaultValue}</p>
                                        <p>{autoPartDetail?.vehicle_model || defaultValue}</p>
                                        <p>{autoPartDetail?.vehicle_year || defaultValue}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.secondRow}>
                        <div className={styles.keys}>
                            <p>Description:</p>
                        </div>
                        <div className={styles.values}>
                            <p>Introducing the NexaDrive™ Quantum Suspension Module, the future of automotive ride comfort and
                                performance. This revolutionary auto part is designed for the car enthusiast who craves the perfect harmony of
                                unparalleled smoothness and unbeatable road grip.</p>
                        </div>
                        <div>

                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}