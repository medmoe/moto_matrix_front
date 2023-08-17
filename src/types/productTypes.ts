// Types
export interface AutoPartDetail {
    name: string,
    image?: string,
    description: string,
    manufacturer: string,
    price: number,
    stock: number,
    weight: number,
    dimensions: string,
    location: string,
    category: string,
    vehicle_make: string,
    vehicle_model: string,
    vehicle_year: string,
    condition: string,
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
export const inventoryTableColumnsMapping: Record<string, string> = {
    'Image': 'image',
    'Name': 'name',
    'Manufacturer': 'manufacturer',
    'Price': 'price',
    'Stock': 'stock',
    'Weight': 'weight',
    'Dimensions': 'dimensions',
    'Location': 'location',
    'Category': 'category',
    'Vehicle Make': 'vehicle_make',
    'Vehicle Model': 'vehicle_model',
    'Vehicle Year': 'vehicle_year',
    'Condition': 'condition',
    'OEM Number': 'oem_number',
    'UPC Number': 'upc_number',
    'Description': 'description'
}