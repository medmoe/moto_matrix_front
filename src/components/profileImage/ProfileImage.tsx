import React, {useState} from "react";
import styles from "./ProfileImage.module.css";
import MaterialIcon from 'material-icons-react';

interface ProfileProps {
    src: string;
    alt: string;
    width: string;
    height: string;
}

export function ProfileImage({src, alt, width, height}: ProfileProps) {
    const [hasLoaded, setHasLoaded] = useState(true);
    const handleError = () => {
        setHasLoaded(false);
    }
    return (

        hasLoaded ?
            <div className={styles.container}>
                <img src={src} alt={alt} onError={handleError} width={width} height={height}/>
            </div> :
            <div className={styles.container}>
                <MaterialIcon icon="person" size={width} color="#FFFFFF"/>
            </div>

    )
}