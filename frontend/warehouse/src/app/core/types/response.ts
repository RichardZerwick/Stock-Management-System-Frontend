export interface IResponse<T> {
    success: boolean;
    message: string;
    id?: T;
    token?: string;
}