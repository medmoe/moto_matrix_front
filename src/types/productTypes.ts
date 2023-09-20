import {Provider} from "./userTypes";

// Types
export interface Component {
    provider?: Provider;
    name: string;
    description: string;
    manufacturer: string;
    price: number;
    stock: number;
    image: string;
    weight: number;
    dimensions: string;
    location: string;
}

type ComponentWithoutImage = Omit<Component, 'image'>

export interface AutoPartDetail {
    id: number,
    component: Component,
    category: AutoPartCategory;
    vehicle_make: string,
    vehicle_model: string,
    vehicle_year: string,
    condition: Condition;
    oem_number: string,
    upc_number: string
}

export interface AutoPartDetailWithoutImage {
    id?: number,
    component: ComponentWithoutImage,
    category: AutoPartCategory;
    vehicle_make: string,
    vehicle_model: string,
    vehicle_year: string,
    condition: Condition;
    oem_number: string,
    upc_number: string
}

// Enumerators
export enum Condition {
    New = "NEW",
    Used = "USED",
    Refurbished = "REFURBISHED",
}

export enum AutoPartCategory {
    Engine = "ENGINE",
    Transmission = "TRANSMISSION",
    Suspension = "SUSPENSION",
    Brakes = "BRAKES",
    Electrical = "ELECTRICAL",
    Body = "BODY",
    Interior = "INTERIOR",
    Tires = "TIRES",
    Wheels = "WHEELS",
    Accessories = "ACCESSORIES",
}

// Mappings
export const inventoryTableColumnsMapping: Record<string, Record<string, string> | string> = {
    'id': 'id',
    'component': {
        'Image': 'image',
        'Name': 'name',
        'Manufacturer': 'manufacturer',
        'Price': 'price',
        'Stock': 'stock',
        'Weight': 'weight',
        'Dimensions': 'dimensions',
        'Location': 'location',
        'Description': 'description'
    },
    'Category': 'category',
    'Vehicle Make': 'vehicle_make',
    'Vehicle Model': 'vehicle_model',
    'Vehicle Year': 'vehicle_year',
    'Condition': 'condition',
    'OEM Number': 'oem_number',
    'UPC Number': 'upc_number',
}

// Define a mapping for where each property belongs
export const propertyLocation: { [key: string]: string } = {
    'name': 'component',
    'description': 'component',
    'manufacturer': 'component',
    'price': 'component',
    'stock': 'component',
    'image': 'component',
    'weight': 'component',
    'dimensions': 'component',
    'location': 'component',
}