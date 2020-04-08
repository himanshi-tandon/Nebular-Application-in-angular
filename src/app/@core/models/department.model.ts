export interface departmentModel {
    Id: number;
    department: string;
    users:UserModel[];
    status:string;
}


export class UserModel {
    id: number;
    name: string;
    empid: string;
    designation: string;
    email: string;
    phone: any;
    role: string;
    reporting: string;
    department: string;
    country: string;
    plant: string;
    description: string;
    status: string;
}