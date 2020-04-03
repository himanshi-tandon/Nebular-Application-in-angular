export class departmentModel {
    Id: number;
    department: string;
    users:UserModel[];
    status:string;
}


export class UserModel {
    empId:number;
    name:string;
}