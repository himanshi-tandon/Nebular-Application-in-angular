export class MilestoneModel {
    id: number;
    milestonename: string;
    targettimeunit: string;
    description: string;
    status: string;
    targetTime: number;
    Dependency: DependencyModel;
    isSelected: boolean;
    startDate: Date;
    targetDate: Date;
    empid: number;
    remarks: CFTRemarksModel[];
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
    id: number;
    department: string;
    plant: string;
    description: string;
    milestones: MilestoneModel[];
    status: string;
}

export interface CFTRemarksModel {
    empid?: number;
    name?: string;
    remarktext?: string;
    createddate?: Date;
}