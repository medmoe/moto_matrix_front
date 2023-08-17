// Types
export interface RecentOrder {
    name: string,
    quantity: number,
    date: string,
    status: 'Paid' | 'Pending' | 'Canceled',
}


// Mappings
export const recentOrdersTableMapping: Record<string, string> = {
    'Name': 'name',
    'Quantity': 'quantity',
    'Date': 'date',
    'Status': 'status',
}