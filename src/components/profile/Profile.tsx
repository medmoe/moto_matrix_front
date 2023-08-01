import React, {useState} from "react";
import styles from "./Profile.module.css";
import MaterialIcon from 'material-icons-react';

interface ProfileProps {
    src: string;
    alt: string;
}

export function Profile({src, alt}: ProfileProps) {
    const [hasLoaded, setHasLoaded] = useState(true);
    const handleError = () => {
        setHasLoaded(false);
    }
    return (

        hasLoaded ?
            <div className={styles.container}>
                <img src={src} alt={alt} onError={handleError}/>
            </div> :
            <div className={styles.container}>
                <MaterialIcon icon="person" size={140} color="#FFFFFF"/>
            </div>

    )
}