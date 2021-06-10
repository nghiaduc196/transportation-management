export interface IUser{
    id?: any;
    login?: any;
    fullName?: any;
    otp?: any;
    phoneNumber?: any;
}

export class User implements IUser{
    constructor(
        public id?: any,
        public login?: any,
        public fullName?: any,
        public otp?: any,
        public phoneNumber?: any
    ){}
}