export interface IProduct {
    id?: number;
    product_name?: string;
    product_category?: 'food' | 'clothes' | 'medicine' | 'household';
    product_quantity?: number;
    createdBy?: number;
    [key: string]: string | number | undefined;
}

export interface IProductData {
    id: number | null;
}