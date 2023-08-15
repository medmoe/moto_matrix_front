import React, {FormEvent, useState} from "react";
import {UpperBar} from "../../../upperBar/UpperBar";
import {Button} from "../../../button/Button";
import {InputField} from "../../../inputField/InputField";
import {SearchField} from "../../../searchField/SearchField";
import styles from './AddProduct.module.css';
import MaterialIcon from 'material-icons-react';
import {Divider} from "../../../divider/Divider";
import {useAppDispatch, useAppSelector} from "../../../../hooks";
import {selectAutoPartDetail, updatePageName} from "../../../../features/dashboard/dashboardSlice";
import {selectUserData} from "../../../../features/user/userSlice";
import {API, AutoPartCategory, Condition, AutoPartDetail, DASHBOARD_PAGES} from "../../../../types/types";
import axios, {all} from "axios";
import {Spinner} from "../../../spinner/Spinner";
import {Select} from "../../../select/Select";
import {Alert} from "../../../alert/Alert";

export function AddProduct() {
    const dispatch = useAppDispatch();
    const autoPartDetails = useAppSelector(selectAutoPartDetail);
    const userData = useAppSelector(selectUserData);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploaded, setIsUploaded] = useState<boolean>(false);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [isNotUploaded, setIsNotUploaded] = useState<boolean>(false)
    const [autoPartFormData, setAutoPartFromData] = useState<AutoPartDetail>(autoPartDetails);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);


    const conditions: [string, string][] = Object.keys(Condition)
        .filter(key => isNaN(Number(key))) // filter out numeric keys
        .map(key => [key, Condition[key as keyof typeof Condition]]);

    const categories: [string, string][] = Object.keys(AutoPartCategory)
        .filter(key => isNaN(Number(key))) // filter out numeric keys
        .map(key => [key, AutoPartCategory[key as keyof typeof AutoPartCategory]]);


    const submitForm = async (event: FormEvent) => {
        event.preventDefault()
        // Validate data before submission
        if (!isValidYear(autoPartFormData.vehicle_year)){
            setErrorMessage("Please enter a valid vehicle year");
            return
        }
        if (isNaN(Number(autoPartFormData.price))) {
            setErrorMessage("Please enter a valid price");
            return
        }
        if (isNaN(Number(autoPartFormData.stock))) {
            setErrorMessage("Please enter a valid quantity");
            return
        }
        if (isNaN(Number(autoPartFormData.weight))) {
            setErrorMessage("Please enter a valid weight");
            return
        }
        const options = {headers: {'Content-Type': 'application/json'}, withCredentials: true}
        await axios.post(`${API}components/auto-parts/`, JSON.stringify(autoPartFormData), options)
            .then((res) => {
                console.log(res);
                dispatch(updatePageName(DASHBOARD_PAGES.INVENTORY))
            })
            .catch((err) => {
                console.log(err)
            })

    }

    const isValidYear = (year: string): boolean => {
        const startYear = 1950;
        const endYear = new Date().getFullYear();
        return year.length === 4 &&
            !isNaN(Number(year)) &&
            parseInt(year, 10) >= startYear &&
            parseInt(year, 10) <= endYear
    }

    const handleChange = (event: FormEvent) => {
        event.preventDefault()
        const target = event.target as HTMLInputElement | HTMLSelectElement
        setAutoPartFromData({
            ...autoPartFormData,
            [target.name]: target.value
        })

    }

    const fileSelectHandler = async (event: FormEvent) => {
        setIsUploading(true);
        const target: HTMLInputElement = event.target as HTMLInputElement
        const files: FileList = target.files as FileList
        const file: File = files[0] as File
        setSelectedFile(file);
        const formData = new FormData();
        formData.append('file', file);
        await axios.post(`${API}components/auto-parts/upload-image/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true
        })
            .then((res) => {
                setIsUploaded(true);
                setIsUploading(false);
                setIsNotUploaded(false)
            })
            .catch((err) => {
                setIsNotUploaded(true);
                setIsUploading(false);
                setIsUploaded(false);
            })
    }
    return (
        <div>
            {errorMessage? <Alert message={errorMessage} onClose={() => setErrorMessage("")} />: null}
            <div className={styles.container}>
                <div className={styles.upperBarContainer}>
                    <UpperBar components={[<SearchField/>]}
                              left="635px"
                              title="Add Product"
                              subtitle="new product form"
                    />
                </div>
                <form>
                    <div className={styles.body}>
                        <div className={styles.lowerCardContainer}>
                            <div className={styles.buttonsContainer}>
                                <Button label="Cancel"
                                        height="40px"
                                        width="100px"
                                        textColor={"#007bff"}
                                        backgroundColor={"#fff"} border={"1px solid #007bff"}
                                        handleClick={() => dispatch(updatePageName(DASHBOARD_PAGES.INVENTORY))}/>
                                <Button label={"Submit"}
                                        height={"40px"}
                                        width={"100px"}
                                        textColor={"#fff"}
                                        backgroundColor={"#007bff"}
                                        border={"none"}
                                        icon={<MaterialIcon icon={"send"} size={24} color={"#fff"}/>}
                                        handleClick={submitForm}
                                />
                            </div>
                            <div className={styles.generalInformationContainer}>
                                <div className={styles.row}>
                                    <p className={styles.title}>General Information</p>
                                </div>
                                <div className={styles.row}>
                                    <div className={styles.col}>
                                        <label htmlFor={"productName"}>Name</label>
                                        <InputField border={"1px solid #9e9d9d"}
                                                    handleChange={handleChange}
                                                    width={"195px"}
                                                    height={"30px"}
                                                    id={"productName"}
                                                    type={"text"}
                                                    placeholder={"Enter product name"}
                                                    backgroundColor={"#fff"}
                                                    name={"name"}
                                                    value={autoPartFormData.name}
                                        />
                                    </div>
                                    <div className={styles.col}>
                                        <label htmlFor={"manufacturer"}>Manufacturer</label>
                                        <InputField border={"1px solid #9e9d9d"}
                                                    handleChange={handleChange}
                                                    width={"195px"}
                                                    height={"30px"}
                                                    id={"manufacturer"}
                                                    type={"text"}
                                                    placeholder={"Enter manufacturer"}
                                                    backgroundColor={"#fff"}
                                                    name={"manufacturer"}
                                                    value={autoPartFormData.manufacturer}
                                        />
                                    </div>
                                    <div className={styles.col}>
                                        <label htmlFor={"location"}>Location</label>
                                        <InputField border={"1px solid #9e9d9d"}
                                                    handleChange={handleChange}
                                                    width={"195px"}
                                                    height={"30px"}
                                                    id={"location"}
                                                    type={"text"}
                                                    placeholder={"Enter location in stock"}
                                                    backgroundColor={"#fff"}
                                                    name={"location"}
                                                    value={autoPartFormData.location}
                                        />
                                    </div>
                                    <div className={styles.col}>
                                        <label htmlFor={"dimensions"}>Dimensions</label>
                                        <InputField border={"1px solid #9e9d9d"}
                                                    handleChange={handleChange}
                                                    width={"195px"}
                                                    height={"30px"}
                                                    id={"dimensions"}
                                                    type={"text"}
                                                    placeholder={"Enter dimensions"}
                                                    backgroundColor={"#fff"}
                                                    name={"dimensions"}
                                                    value={autoPartFormData.dimensions}
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
                                                        handleChange={handleChange}
                                                        width={"80px"}
                                                        height={"30px"}
                                                        id={"quantity"}
                                                        type={"text"}
                                                        backgroundColor={"#fff"}
                                                        name={"stock"}
                                                        value={`${autoPartFormData.stock}`}
                                            />
                                        </div>
                                        <div className={styles.col}>
                                            <label htmlFor={"price"}>Price</label>
                                            <InputField border={"1px solid 9e9d9d"}
                                                        handleChange={handleChange}
                                                        width={"80px"}
                                                        height={"30px"}
                                                        id={"price"}
                                                        type={"text"}
                                                        backgroundColor={"#fff"}
                                                        name={"price"}
                                                        value={`${autoPartFormData.price}`}
                                            />
                                        </div>
                                        <div className={styles.col}>
                                            <label htmlFor={"weight"}>Weight</label>
                                            <InputField border={"1px solid 9e9d9d"}
                                                        handleChange={handleChange}
                                                        width={"80px"}
                                                        height={"30px"}
                                                        id={"weight"}
                                                        type={"text"}
                                                        backgroundColor={"#fff"}
                                                        name={"weight"}
                                                        value={`${autoPartFormData.weight}`}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.uploadImageContainer}>
                                        <div className={styles.col}>
                                            <label htmlFor={"image"}>Image
                                                <div className={styles.customImageUpload}>
                                                    <MaterialIcon icon={"cloud_upload"} size={30} color={"#9e9d9d"}/>
                                                    <p style={{color: "#9e9d9d"}}>{
                                                        isUploading ? "Uploading..." :
                                                            isUploaded ? "Uploaded" :
                                                                isNotUploaded ? "Failed!" :
                                                                    "Image Upload"
                                                    }</p>
                                                </div>
                                            </label>
                                            <input type={"file"}
                                                   name={"image"}
                                                   id={"image"}
                                                   style={{display: "none"}}
                                                   onChange={fileSelectHandler}
                                            />
                                        </div>
                                        <div>
                                            {isUploading ? <Spinner height={"30px"} width={"30px"}/> :
                                                isUploaded ? <MaterialIcon icon={"done"} size={24} color={'#4ecb71'}/> :
                                                    isNotUploaded ?
                                                        <MaterialIcon icon={"close"} size={24}
                                                                      color={'#ff0000'}/> : null
                                            }
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
                                                    handleChange={handleChange}
                                                    width={"195px"}
                                                    height={"30px"}
                                                    id={"make"}
                                                    type={"text"}
                                                    placeholder={"Enter vehicle make"}
                                                    backgroundColor={"#fff"}
                                                    name={"vehicle_make"}
                                                    value={autoPartFormData.vehicle_make}
                                        />
                                    </div>
                                    <div className={styles.col}>
                                        <label htmlFor={"OEM"}>OEM Number</label>
                                        <InputField border={"1px solid #9e9d9d"}
                                                    handleChange={handleChange}
                                                    width={"195px"}
                                                    height={"30px"}
                                                    id={"OEM Number"}
                                                    type={"text"}
                                                    placeholder={"Enter OEM number"}
                                                    backgroundColor={"#fff"}
                                                    name={"OEM Number"}
                                                    value={autoPartFormData.OEM_number}
                                        />
                                    </div>
                                    <div className={styles.col}>
                                        <label htmlFor={"UPC"}>UPC Number</label>
                                        <InputField border={"1px solid #9e9d9d"}
                                                    handleChange={handleChange}
                                                    width={"195px"}
                                                    height={"30px"}
                                                    id={"UPC"}
                                                    type={"text"}
                                                    placeholder={"Enter UPC number"}
                                                    backgroundColor={"#fff"}
                                                    name={"UPC"}
                                                    value={autoPartFormData.OPC_number}
                                        />
                                    </div>
                                </div>
                                <div className={styles.secondCol}>
                                    <div className={styles.col}>
                                        <label htmlFor={"model"}>Enter vehicle model</label>
                                        <InputField border={"1px solid #9e9d9d"}
                                                    handleChange={handleChange}
                                                    width={"195px"}
                                                    height={"30px"}
                                                    id={"model"}
                                                    type={"text"}
                                                    placeholder={"Enter vehicle model"}
                                                    backgroundColor={"#fff"}
                                                    name={"vehicle_model"}
                                                    value={autoPartFormData.vehicle_model}
                                        />

                                        <label htmlFor={"year"}>Enter vehicle year</label>
                                        <InputField border={"1px solid #9e9d9d"}
                                                    handleChange={handleChange}
                                                    width={"195px"}
                                                    height={"30px"}
                                                    id={"year"}
                                                    type={"text"}
                                                    placeholder={"Enter vehicle year"}
                                                    backgroundColor={"#fff"}
                                                    name={"vehicle_year"}
                                                    value={autoPartFormData.vehicle_year}
                                        />
                                    </div>
                                </div>
                                <div className={styles.thirdCol}>
                                    <div className={styles.col}>
                                        <label htmlFor={"condition"}>Select condition</label>
                                        <Select options={conditions}
                                                handleChange={handleChange}
                                                currentValue={autoPartFormData.condition}
                                                name={"condition"}
                                        />
                                    </div>
                                    <div className={styles.col}>
                                        <label htmlFor={"category"}>Select category</label>
                                        <Select options={categories}
                                                handleChange={handleChange}
                                                currentValue={autoPartFormData.category}
                                                name={"category"}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
