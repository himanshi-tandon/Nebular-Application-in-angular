import { CFTDetailsModel } from './cftdetails.model';
import { CFTMilestoneModel, CFTRemarksModel } from './cftmilestones.model';

export class TaskByUserModel extends CFTDetailsModel {
    cftMileStoneData: CFTMilestoneModel[];

}

export class PostNewRemarkForTask {
    id?: string;
    scrNo?: string;
    cftNo?: string;
    department?: string;
    milestonename?: string;
    status?: string;
    remarks?: CFTRemarksModel

}