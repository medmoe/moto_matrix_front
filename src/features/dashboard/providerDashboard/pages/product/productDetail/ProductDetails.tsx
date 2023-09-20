import React, {useState} from "react";
import {Alert, Button, Divider, ProductImages, Rating, Spinner, UpperBar} from "../../../../../../components";
import {AutoPartDetail} from "../../../../../../types/productTypes";
import styles from './ProductDetails.module.css';
import MaterialIcon from 'material-icons-react';
import {useAppDispatch} from "../../../../../../hooks";
import {DASHBOARD_PAGES} from "../../../../../../types/dashboardTypes";
import {updatePageName} from "../../../../dashboardSlice";
import axios from "axios";
import {API, SPINNER_SIZE} from "../../../../../../constants";

interface ProductDetailsProps {
    autoPartDetail?: AutoPartDetail
}

const BUTTON_WIDTH = "20%";

export function ProductDetails({autoPartDetail}: ProductDetailsProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const pen: JSX.Element = <MaterialIcon icon={"edit"} size={35} color={"#fff"}/>
    const defaultValue = "N/A"
    const dispatch = useAppDispatch();
    const deleteProduct = async () => {
        setIsLoading(true);
        const options = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        }
        if (!autoPartDetail) {
            return (
                <Alert message={"Cannot perform this action"} onClose={() => dispatch(updatePageName(DASHBOARD_PAGES.INVENTORY))}/>
            )
        }
        console.log(autoPartDetail.id)
        await axios.delete(`${API}components/auto-parts/${autoPartDetail.id}/`, options)
            .then((res) => {
                dispatch(updatePageName(DASHBOARD_PAGES.INVENTORY))
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
            })
    }
    const cancelUpdate = () => {
        dispatch(updatePageName(DASHBOARD_PAGES.INVENTORY));
    }
    const updateProduct = () => {
        dispatch(updatePageName(DASHBOARD_PAGES.ADD_PRODUCT));

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
                {isLoading ? <Spinner width={SPINNER_SIZE.width} height={SPINNER_SIZE.height}/> :
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
                        <div className={styles.description}>
                            <div className={styles.keys}>
                                <p>Description:</p>
                            </div>
                            <div className={styles.values}>
                                <p>Introducing the NexaDrive™ Quantum Suspension Module, the future of automotive ride comfort and
                                    performance. This revolutionary auto part is designed for the car enthusiast who craves the perfect harmony of
                                    unparalleled smoothness and unbeatable road grip.</p>
                            </div>
                        </div>

                    </div>
                }
            </div>

        </div>
    )
}