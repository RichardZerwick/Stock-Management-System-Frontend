export interface IUser {
    name?: string;
    password: string;
    email?: string;
    token?: string;
    role?: 'admin' | 'cashier';
}

export interface IUserData {
    id: number;
    //token: string
}