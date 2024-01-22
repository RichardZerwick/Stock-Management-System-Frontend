export interface IProduct {
    product_name?: string;
    product_category?: 'food' | 'clothes' | 'medicine' | 'household';
    product_quantity?: number;
    createdBy?: number;
    id?: number;
}

export interface IProductData {
    id: number | null;
}