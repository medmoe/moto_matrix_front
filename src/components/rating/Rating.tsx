import React from "react";
import styles from "./Rating.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";

interface RatingProps {
    rate: number
}

export function Rating ({rate}: RatingProps) {
    let stars = [];
    rate = Math.round(rate * 2) / 2; // rounding to nearest 0.5
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rate)) {
            // Add a full star
            stars.push(<FontAwesomeIcon icon={faStar} color="#f9d100" key={i}/>);
        } else if (i === Math.ceil(rate) && rate % 1 !== 0) {
            // Add a half star
            stars.push(<FontAwesomeIcon icon={faStarHalfAlt} color="#f9d100" key={i}/>);
        } else {
            // Add an empty star
            stars.push(<FontAwesomeIcon icon={faStar} color="gray" key={i}/>);
        }
    }

    return (
        <div>
            {stars}
        </div>
    )
}
