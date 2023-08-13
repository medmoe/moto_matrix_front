import React, {FormEvent, useState} from "react";
import {UpperBar} from "../../../upperBar/UpperBar";
import {Button} from "../../../button/Button";
import {InputField} from "../../../inputField/InputField";
import {SearchField} from "../../../searchField/SearchField";
import styles from './AddProduct.module.css';
import MaterialIcon from 'material-icons-react';
import {Divider} from "../../../divider/Divider";
import {useAppDispatch} from "../../../../hooks";
import {updatePageName} from "../../../../features/dashboard/providerDashboard/dashboardSlice";
import {useAppSelector} from "../../../../hooks";
import {selectUserData} from "../../../../features/user/userSlice";
import {API} from "../../../../types/types";
import axios from "axios";

export function AddProduct() {
    const dispatch = useAppDispatch();
    const userData = useAppSelector(selectUserData);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileSelectHandler = (event: FormEvent) => {
        const target: HTMLInputElement = event.target as HTMLInputElement
        const files: FileList = target.files as FileList
        const file: File = files[0] as File
        setSelectedFile(file);
        const formData = new FormData();
        formData.append('image', file);
        axios.put(`${API}components/files/${userData.user.id}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true
        })
            .then((res) => {
                console.log("success");
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <form>
            <div className={styles.container}>
                <div className={styles.upperBarContainer}>
                    <UpperBar components={[<SearchField/>]}
                              left="635px"
                              title="Add Product"
                              subtitle="new product form"
                    />
                </div>
                <div className={styles.body}>
                    <div className={styles.lowerCardContainer}>
                        <div className={styles.buttonsContainer}>
                            <Button label="Cancel"
                                    height="40px"
                                    width="100px"
                                    textColor={"#007bff"}
                                    backgroundColor={"#fff"} border={"1px solid #007bff"}
                                    handleClick={() => dispatch(updatePageName('inventory'))}/>
                            <Button label={"Submit"}
                                    height={"40px"}
                                    width={"100px"}
                                    textColor={"#fff"}
                                    backgroundColor={"#007bff"}
                                    border={"none"}
                                    icon={<MaterialIcon icon={"send"} size={24} color={"#fff"}/>}/>
                        </div>
                        <div className={styles.generalInformationContainer}>
                            <div className={styles.row}>
                                <p className={styles.title}>General Information</p>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.col}>
                                    <label htmlFor={"productName"}>Name</label>
                                    <InputField border={"1px solid #9e9d9d"}
                                                handleChange={() => console.log("product name")}
                                                width={"195px"}
                                                height={"30px"}
                                                id={"productName"}
                                                type={"text"}
                                                placeholder={"Enter product name"}
                                                backgroundColor={"#fff"}
                                                name={"productName"}
                                    />
                                </div>
                                <div className={styles.col}>
                                    <label htmlFor={"manufacturer"}>Manufacturer</label>
                                    <InputField border={"1px solid #9e9d9d"}
                                                handleChange={() => console.log("manufacturer")}
                                                width={"195px"}
                                                height={"30px"}
                                                id={"manufacturer"}
                                                type={"text"}
                                                placeholder={"Enter manufacturer"}
                                                backgroundColor={"#fff"}
                                                name={"manufacturer"}
                                    />
                                </div>
                                <div className={styles.col}>
                                    <label htmlFor={"location"}>Location</label>
                                    <InputField border={"1px solid #9e9d9d"}
                                                handleChange={() => console.log("product name")}
                                                width={"195px"}
                                                height={"30px"}
                                                id={"location"}
                                                type={"text"}
                                                placeholder={"Enter location in stock"}
                                                backgroundColor={"#fff"}
                                                name={"location"}
                                    />
                                </div>
                                <div className={styles.col}>
                                    <label htmlFor={"dimensions"}>Dimensions</label>
                                    <InputField border={"1px solid #9e9d9d"}
                                                handleChange={() => console.log("dimensions")}
                                                width={"195px"}
                                                height={"30px"}
                                                id={"dimensions"}
                                                type={"text"}
                                                placeholder={"Enter dimensions"}
                                                backgroundColor={"#fff"}
                                                name={"dimensions"}
                                    />
                                </div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.col}>
                                    <label htmlFor={"description"}>Description</label>
                                    <textarea placeholder={"Enter a description"}/>
                                </div>
                                <div className={styles.numberFields}>
                                    <div className={styles.col}>
                                        <label htmlFor={"quantity"}>Quantity</label>
                                        <InputField border={"1px solid 9e9d9d"}
                                                    handleChange={() => console.log("quantity")}
                                                    width={"80px"}
                                                    height={"30px"}
                                                    id={"quantity"}
                                                    type={"number"}
                                                    backgroundColor={"#fff"}
                                                    name={"quantity"}
                                        />
                                    </div>
                                    <div className={styles.col}>
                                        <label htmlFor={"price"}>Price</label>
                                        <InputField border={"1px solid 9e9d9d"}
                                                    handleChange={() => console.log("price")}
                                                    width={"80px"}
                                                    height={"30px"}
                                                    id={"price"}
                                                    type={"number"}
                                                    backgroundColor={"#fff"}
                                                    name={"price"}
                                        />
                                    </div>
                                    <div className={styles.col}>
                                        <label htmlFor={"weight"}>Weight</label>
                                        <InputField border={"1px solid 9e9d9d"}
                                                    handleChange={() => console.log("weight")}
                                                    width={"80px"}
                                                    height={"30px"}
                                                    id={"weight"}
                                                    type={"number"}
                                                    backgroundColor={"#fff"}
                                                    name={"weight"}
                                        />
                                    </div>
                                </div>
                                <div className={styles.uploadImageContainer}>
                                    <div className={styles.col}>
                                        <label htmlFor={"image"}>Image
                                            <div className={styles.customImageUpload}>
                                                <MaterialIcon icon={"cloud_upload"} size={24} color={"#9e9d9d"}/>
                                                <p style={{color: "#9e9d9d"}}>Image Upload</p>
                                            </div>
                                        </label>
                                        <input type={"file"}
                                               name={"image"}
                                               id={"image"}
                                               style={{display: "none"}}
                                               onClick={fileSelectHandler}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.divider}>
                            <Divider width={"943px"}/>
                        </div>
                        <div className={styles.detailedInformationContainer}>
                            <div className={styles.firstCol}>
                                <p className={styles.title}>Detailed Information</p>
                                <div className={styles.col}>
                                    <label htmlFor={"make"}>Vehicle Make</label>
                                    <InputField border={"1px solid #9e9d9d"}
                                                handleChange={() => console.log("make")}
                                                width={"195px"}
                                                height={"30px"}
                                                id={"make"}
                                                type={"text"}
                                                placeholder={"Enter vehicle make"}
                                                backgroundColor={"#fff"}
                                                name={"make"}
                                    />
                                </div>
                                <div className={styles.col}>
                                    <label htmlFor={"OEM"}>OEM Number</label>
                                    <InputField border={"1px solid #9e9d9d"}
                                                handleChange={() => console.log("OEM Number")}
                                                width={"195px"}
                                                height={"30px"}
                                                id={"OEM Number"}
                                                type={"text"}
                                                placeholder={"Enter OEM number"}
                                                backgroundColor={"#fff"}
                                                name={"OEM Number"}
                                    />
                                </div>
                                <div className={styles.col}>
                                    <label htmlFor={"UPC"}>UPC Number</label>
                                    <InputField border={"1px solid #9e9d9d"}
                                                handleChange={() => console.log("UPC")}
                                                width={"195px"}
                                                height={"30px"}
                                                id={"UPC"}
                                                type={"text"}
                                                placeholder={"Enter UPC number"}
                                                backgroundColor={"#fff"}
                                                name={"UPC"}
                                    />
                                </div>
                            </div>
                            <div className={styles.secondCol}>
                                <div className={styles.col}>
                                    <label htmlFor={"model"}>Enter vehicle model</label>
                                    <InputField border={"1px solid #9e9d9d"}
                                                handleChange={() => console.log("UPC")}
                                                width={"195px"}
                                                height={"30px"}
                                                id={"model"}
                                                type={"text"}
                                                placeholder={"Enter vehicle model"}
                                                backgroundColor={"#fff"}
                                                name={"model"}
                                    />
                                </div>
                            </div>
                            <div className={styles.thirdCol}>
                                <div className={styles.col}>
                                    <label htmlFor={"year"}>year</label>
                                    <InputField border={"1px solid 9e9d9d"}
                                                handleChange={() => console.log("year")}
                                                width={"80px"}
                                                height={"30px"}
                                                id={"year"}
                                                type={"number"}
                                                backgroundColor={"#fff"}
                                                name={"year"}
                                    />
                                </div>
                                <div className={styles.col}>
                                    <label htmlFor={"condition"}>condition</label>
                                    <InputField border={"1px solid 9e9d9d"}
                                                handleChange={() => console.log("condition")}
                                                width={"80px"}
                                                height={"30px"}
                                                id={"condition"}
                                                type={"number"}
                                                backgroundColor={"#fff"}
                                                name={"condition"}
                                    />
                                </div>
                                <div className={styles.col}>
                                    <label htmlFor={"category"}>category</label>
                                    <InputField border={"1px solid 9e9d9d"}
                                                handleChange={() => console.log("category")}
                                                width={"80px"}
                                                height={"30px"}
                                                id={"category"}
                                                type={"number"}
                                                backgroundColor={"#fff"}
                                                name={"category"}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
