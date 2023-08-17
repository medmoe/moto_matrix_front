
// constants
import {number} from "prop-types";

export const API = "http://localhost:8000/";
export const STATUS_COLORS: { [key: string]: string } = {
    "Paid": "#4ECB71",
    "Pending": "#F9d100",
    "Canceled": "#FF0000",
    "New": "#4Ecb71",
    "Used": "#f9d100",
    "Refurbished": "#FF0000",
}

export const BAR_COLORS: string[] = ["#F94144", "#F3722C", "#F8961E", "#F9C74F", "#90BE6D"]


export const PRODUCT_LIST_PAGE_SIZE: number = 20;
export const PAGES_TO_DISPLAY: number = 7;
