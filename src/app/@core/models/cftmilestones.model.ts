export class MilestoneModel {
    id: number;
    milestonename: string;
    targettimeunit: string;
    description: string;
    status: string;
    targetTime: number;
    Dependency: DependencyModel;
    isMilestoneSelected: boolean;
    startDate: Date;
    targetDate: Date;
    empId: number;
    remarks: string;
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
    Milestones: MilestoneModel[];
    status: string;
}

