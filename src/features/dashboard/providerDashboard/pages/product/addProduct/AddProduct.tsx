import React, {FormEvent, useState} from "react";
import {Alert, Button, Divider, InputField, SearchField, Select, Spinner, UpperBar} from "../../../../../../components";
import styles from './AddProduct.module.css';
import MaterialIcon from 'material-icons-react';
import {useAppDispatch, useAppSelector} from "../../../../../../hooks";
import {selectAutoPartDetail, updatePageName} from "../../../../dashboardSlice";
import {AutoPartCategory, AutoPartDetailWithoutImage, Condition, propertyLocation} from "../../../../../../types/productTypes";
import {DASHBOARD_PAGES} from "../../../../../../types/dashboardTypes";
import {API} from "../../../../../../constants";
import {ResponseStatusCodes} from "../../../../../../types/generalTypes";
import axios from "axios";
import {NavigateFunction, useNavigate} from "react-router-dom";

interface InputFieldTypes {
    label: string,
    name: string,
    placeholder?: string,
    value?: string,
    type: string,
}

interface InputFieldValuesTypes {
    generalInformation: InputFieldTypes[],
    detailedInformation: InputFieldTypes[],
}

export function AddProduct() {
    const navigate: NavigateFunction = useNavigate();
    const dispatch = useAppDispatch();
    const {component: {image, ...componentWithoutImage}, ...autoPartData} = useAppSelector(selectAutoPartDetail);
    const rest = {...autoPartData, component: componentWithoutImage} as AutoPartDetailWithoutImage
    const [fileUploadStatus, setFileUploadStatus] = useState<'idle' | 'uploading' | 'uploaded' | 'failed'>('idle');
    const [formUploadStatus, setFormUploadStatus] = useState<'idle' | 'uploading' | 'failed'>('idle');
    const [autoPartFormData, setAutoPartFromData] = useState(rest);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const handleChange = (event: FormEvent) => {
        event.preventDefault()
        const target = event.target as HTMLInputElement | HTMLSelectElement
        const location: string = propertyLocation[target.name];
        let updatedData: AutoPartDetailWithoutImage;
        switch (location) {
            case 'component':
                updatedData = {
                    ...autoPartFormData,
                    component: {
                        ...autoPartFormData.component,
                        [target.name]: target.value
                    }
                }
                break
            default:
                updatedData = {
                    ...autoPartFormData,
                    [target.name]: target.value
                }
                break
        }
        setAutoPartFromData(updatedData);
    }

    const inputFieldCommonValues = {
        border: "1px solid #9e9d9d",
        handleChange: handleChange,
        backgroundColor: "#fff",
        height: "30px"
    }

    const fieldValues: InputFieldValuesTypes = {
        generalInformation: [
            {label: "Name", name: "name", placeholder: "Enter product name", value: autoPartFormData.component.name, type: "text"},
            {
                label: "Manufacturer",
                name: "manufacturer",
                placeholder: "Enter manufacturer",
                value: autoPartFormData.component.manufacturer,
                type: "text"
            },
            {label: "Location", name: "location", placeholder: "Enter location in stock", value: autoPartFormData.component.location, type: "text"},
            {label: "Dimensions", name: 'dimensions', placeholder: "Enter dimensions", value: autoPartFormData.component.dimensions, type: "text"},
            {label: "Quantity", name: 'stock', value: `${autoPartFormData.component.stock}`, type: "number"},
            {label: "Price", name: 'price', value: `${autoPartFormData.component.price}`, type: "number"},
            {label: "Weight", name: 'weight', value: `${autoPartFormData.component.weight}`, type: "number"},
        ],
        detailedInformation: [
            {label: "Vehicle Make", placeholder: "Enter vehicle make", name: "vehicle_make", value: autoPartFormData.vehicle_make, type: "text"},
            {label: "OEM Number", placeholder: "Enter OEM number", name: "oem_number", value: autoPartFormData.oem_number, type: "text"},
            {label: "UPC Number", placeholder: "Enter UPC number", name: "upc_number", value: autoPartFormData.upc_number, type: "text"},
            {label: "Vehicle Model", placeholder: "Enter vehicle model", name: 'vehicle_model', value: autoPartFormData.vehicle_model, type: "text"},
            {label: "Vehicle Year", placeholder: "Enter vehicle year", name: 'vehicle_year', value: autoPartFormData.vehicle_year, type: "text"},
        ]
    }

    const generateInputFields = (breakpoint: number, fieldValues: InputFieldTypes[]): JSX.Element[][] => {
        return fieldValues.reduce((acc: JSX.Element[][], {label, ...rest}, idx) => {
            if (idx === breakpoint) {
                acc.push([])
            }
            const field = (
                <div className={styles.col} key={idx}>
                    <label htmlFor={rest.name}>{label}</label>
                    <InputField {...inputFieldCommonValues} {...rest} id={rest.name}/>
                </div>
            )
            acc[acc.length - 1].push(field)
            return acc
        }, [[]])
    }
    const [firstGeneralInfoRow, secondGeneralInfoCol] = generateInputFields(4, fieldValues.generalInformation);
    const [firstDetailedInfoCol, secondDetailedInfoCol] = generateInputFields(3, fieldValues.detailedInformation);

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
        setFormUploadStatus("uploading");
        const options = {headers: {'Content-Type': 'application/json'}, withCredentials: true}
        await axios.post(`${API}components/auto-parts/`, JSON.stringify(autoPartFormData), options)
            .then((res) => {
                console.log(res);
                dispatch(updatePageName(DASHBOARD_PAGES.INVENTORY))
            })
            .catch((err) => {
                setFormUploadStatus('failed')
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


    const fileSelectHandler = async (event: FormEvent) => {
        setFileUploadStatus("uploading");
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
                setFileUploadStatus('idle');
            })
            .catch((err) => {
                setFileUploadStatus('failed');
                if (err.response && err.response.status === ResponseStatusCodes.Unauthorized) {
                    navigate("/");
                } else {
                    console.error(err);
                }
            })
    }
    return (
        <div className={styles.container}>
            {errorMessage && <Alert message={errorMessage} onClose={() => setErrorMessage("")}/>}
            <div className={styles.upperBarContainer}>
                <UpperBar components={[<SearchField handleChangeOnSearchField={() => console.log("search")} key={0}/>]}
                          title="Add Product"
                          subtitle="new product form"
                />
            </div>
            {formUploadStatus === 'uploading' ? <div className={styles.spinner}><Spinner width={"40px"} height={"40px"}/></div> :
                formUploadStatus === 'failed' ? <Alert message={"form upload failed!"} onClose={() => setFormUploadStatus('idle')}/> :
                    formUploadStatus === 'idle' ?
                        <form className={styles.formContainer}>
                            <div className={styles.lowerCardContainer}>
                                <div className={styles.buttonsContainer}>
                                    <Button label="Cancel"
                                            width={"15%"}
                                            color={"#007bff"}
                                            backgroundColor={"#fff"}
                                            border={"1px solid #007bff"}
                                            handleClick={() => dispatch(updatePageName(DASHBOARD_PAGES.INVENTORY))}/>
                                    <Button label={"Submit"}
                                            width={"15%"}
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
                                        {firstGeneralInfoRow}
                                    </div>
                                    <div className={styles.row}>
                                        <div className={styles.descriptionColumn}>
                                            <div className={styles.col}>
                                                <label htmlFor={"description"}>Description</label>
                                                <textarea placeholder={"Enter a description"}
                                                          name={"description"}
                                                          value={autoPartFormData.component.description}
                                                          onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className={styles.numberFieldsColumn}>
                                            {secondGeneralInfoCol}
                                        </div>
                                        <div className={styles.uploadImageColumn}>
                                            <div className={styles.col}>
                                                <label htmlFor={"image"}>Image
                                                    <div className={styles.customImageUpload}>
                                                        <MaterialIcon icon={"cloud_upload"} size={30} color={"#9e9d9d"}/>
                                                        <p style={{color: "#9e9d9d"}}>{
                                                            fileUploadStatus === 'uploading' ? "Uploading..." :
                                                                fileUploadStatus === 'uploaded' ? "Uploaded" :
                                                                    fileUploadStatus === 'failed' ? "Failed!" :
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
                                                {fileUploadStatus === 'uploading' ? <Spinner height={"30px"} width={"30px"}/> :
                                                    fileUploadStatus === 'uploaded' ? <MaterialIcon icon={"done"} size={24} color={'#4ecb71'}/> :
                                                        fileUploadStatus === 'failed' ?
                                                            <MaterialIcon icon={"close"} size={24} color={'#ff0000'}/> : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.divider}>
                                    <Divider width={"90%"}/>
                                </div>
                                <div className={styles.detailedInformationContainer}>
                                    <div className={styles.firstCol}>
                                        <p className={styles.title}>Detailed Information</p>
                                        {firstDetailedInfoCol}
                                    </div>
                                    <div className={styles.secondCol}>
                                        {secondDetailedInfoCol}
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
                        </form> : null}
        </div>
    )
}
