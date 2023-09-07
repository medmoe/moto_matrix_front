import React, {useState} from 'react'
import styles from "./ProductImages.module.css";
import {DEFAULT_COLOR} from "../../../../../../../constants";
import MaterialIcon from 'material-icons-react';

const IMAGE_SIZE = "50px";

interface ProductImagesProps {
    images: [string?, string?, string?, string?, string?];
}

export function ProductImages({images}: ProductImagesProps) {
    const [selectedImage, setSelectedImage] = useState<string>()
    const defaultImage: JSX.Element = <MaterialIcon icon={'image'} size={IMAGE_SIZE} color={DEFAULT_COLOR}/>
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        console.log(event.target)
    }
    return (
        <div className={styles.container}>
            <div className={styles.imagesColumn}>
                {images.map((url: string | undefined, index: number) => {
                    const element: JSX.Element = url
                        ? <img src={url} alt={'product image'}/>
                        : defaultImage
                    return <div className={styles.image} key={index} onClick={handleClick}> {element} </div>
                })}
            </div>
            <div className={styles.selectedImage}>
                {selectedImage && <img src={selectedImage} alt={'selected product image'} />}
            </div>
        </div>
    )
}