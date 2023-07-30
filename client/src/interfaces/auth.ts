export interface ISignup {
    _id?: number | string;
    name?: string,
    email: string,
    password: string,
    confirmPassword?: string,
    images?: string,
    status?: boolean;
}

export interface ISignin {
    _id?: number | string,
    email: string,
    password: string,
    verificationCode: string
}

export interface IMesages {
    chatId: string,
    senderId: string,
    text: string
}

export interface IUser {
    _id?: number | string;
    name?: string,
    images?: string,
    status?: boolean;
    members: any
}