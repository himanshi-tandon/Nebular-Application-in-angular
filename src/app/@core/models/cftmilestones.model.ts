import { UserModel } from './department.model';

export class MilestoneModel {
    id?: number;
    milestonename?: string;
    targettimeunit?: string;
    description?: string;
    status?: string;
    targetTime?: number;
    Dependency?: DependencyModel;
    isSelected?: boolean;
    startDate?: Date;
    targetDate?: Date;
    empid?: string;
    name?: string;
    remarks?: CFTRemarksModel[];
    newRemarks?: CFTRemarksModel;
    userList: UserModel[]
}

export class DependencyModel {
    id: number;
    milestonename: string;
    targettimeunit: string;
    description: string;
    status: string;
    targetTime: number;
}
export class CFTMilestoneModel {
    id?: number;
    department?: string;
    plant?: string;
    description?: string;
    milestones?: MilestoneModel[];
    status?: string;
    isDepartmentSelected?: boolean
}

export interface CFTRemarksModel {
    empid?: string;
    name?: string;
    remarktext?: string;
    createddate?: Date;
}