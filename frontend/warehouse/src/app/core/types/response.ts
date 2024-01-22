export interface IResponse<T> {
    success: boolean;
    message: string;
    id?: T;
    token?: string;
    tokenExpiry?: Date;
    name?: string;
    email?: string;
    lastLogin?: Date;
    password?: string;
    products?: T;
}