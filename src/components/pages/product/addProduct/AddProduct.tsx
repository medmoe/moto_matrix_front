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
import {AutoPartCategory, AutoPartDetail, Condition} from "../../../../types/productTypes";
import {DASHBOARD_PAGES} from "../../../../types/dashboardTypes";
import {API} from "../../../../constants";
import {ResponseStatusCodes} from "../../../../types/generalTypes";
import axios from "axios";
import {Spinner} from "../../../spinner/Spinner";
import {Select} from "../../../select/Select";
import {Alert} from "../../../alert/Alert";
import {NavigateFunction, useNavigate} from "react-router-dom";

export function AddProduct() {
    const navigate: NavigateFunction = useNavigate();
    const dispatch = useAppDispatch();
    const autoPartDetails = useAppSelector(selectAutoPartDetail);
    const [isUploaded, setIsUploaded] = useState<boolean>(false);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [isNotUploaded, setIsNotUploaded] = useState<boolean>(false)
    const [autoPartFormData, setAutoPartFromData] = useState<AutoPartDetail>(autoPartDetails);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);


    const conditions: [string, string][] = Object.entries(Condition);

    const categories: [string, string][] = Object.entries(AutoPartCategory);


    const submitForm = async (event: FormEvent) => {
        event.preventDefault()
        // Validate data before submission
        if (!isValidYear(autoPartFormData.vehicle_year)) {
            setErrorMessage("Please enter a valid vehicle year");
            return
        }
        if (isNaN(Number(autoPartFormData.component.price))) {
            setErrorMessage("Please enter a valid price");
            return
        }
        if (isNaN(Number(autoPartFormData.component.stock))) {
            setErrorMessage("Please enter a valid quantity");
            return
        }
        if (isNaN(Number(autoPartFormData.component.weight))) {
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
                if (err.response && err.response.status === ResponseStatusCodes.Unauthorized) {
                    navigate("/");
                } else {
                    console.error(err);
                }
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
        const formData = new FormData();
        formData.append('file', file);
        await axios.post(`${API}components/auto-parts/upload-image/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true
        })
            .then(() => {
                setIsUploaded(true);
                setIsUploading(false);
                setIsNotUploaded(false)
            })
            .catch((err) => {
                setIsNotUploaded(true);
                setIsUploading(false);
                setIsUploaded(false);
                if (err.response && err.response.status === ResponseStatusCodes.Unauthorized) {
                    navigate("/");
                } else {
                    console.error(err);
                }
            })
    }
    return (
        <div>
            {errorMessage ? <Alert message={errorMessage} onClose={() => setErrorMessage("")}/> : null}
            <div className={styles.container}>
                <div className={styles.upperBarContainer}>
                    <UpperBar components={[<SearchField handleChangeOnSearchField={() => console.log("search")}/>]}
                              title="Add Product"
                              subtitle="new product form"
                    />
                </div>
                <form>
                    <div className={styles.body}>
                        <div className={styles.lowerCardContainer}>
                            <div className={styles.buttonsContainer}>
                                <Button label="Cancel"
                                        color={"#007bff"}
                                        backgroundColor={"#fff"} border={"1px solid #007bff"}
                                        handleClick={() => dispatch(updatePageName(DASHBOARD_PAGES.INVENTORY))}/>
                                <Button label={"Submit"}
                                        color={"#fff"}
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
                                                    value={autoPartFormData.component.name}
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
                                                    value={autoPartFormData.component.manufacturer}
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
                                                    value={autoPartFormData.component.location}
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
                                                    value={autoPartFormData.component.dimensions}
                                        />
                                    </div>
                                </div>
                                <div className={styles.row}>
                                    <div className={styles.col}>
                                        <label htmlFor={"description"}>Description</label>
                                        <textarea placeholder={"Enter a description"}
                                                  name={"description"}
                                                  value={autoPartFormData.component.description}
                                                  onChange={handleChange}/>
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
                                                        value={`${autoPartFormData.component.stock}`}
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
                                                        value={`${autoPartFormData.component.price}`}
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
                                                        value={`${autoPartFormData.component.weight}`}
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
                                        <label htmlFor={"oem_number"}>OEM Number</label>
                                        <InputField border={"1px solid #9e9d9d"}
                                                    handleChange={handleChange}
                                                    width={"195px"}
                                                    height={"30px"}
                                                    id={"oem_number"}
                                                    type={"text"}
                                                    placeholder={"Enter OEM number"}
                                                    backgroundColor={"#fff"}
                                                    name={"oem_number"}
                                                    value={autoPartFormData.oem_number}
                                        />
                                    </div>
                                    <div className={styles.col}>
                                        <label htmlFor={"upc_number"}>UPC Number</label>
                                        <InputField border={"1px solid #9e9d9d"}
                                                    handleChange={handleChange}
                                                    width={"195px"}
                                                    height={"30px"}
                                                    id={"upc_number"}
                                                    type={"text"}
                                                    placeholder={"Enter UPC number"}
                                                    backgroundColor={"#fff"}
                                                    name={"upc_number"}
                                                    value={autoPartFormData.upc_number}
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
