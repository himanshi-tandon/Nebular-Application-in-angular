import { CFTDetailsModel } from './cftdetails.model';
import { CFTMilestoneModel } from './cftmilestones.model';

export class CFTPostRequestDataModel {
    cftDetails: CFTDetailsModel;
    cftMileStoneData: CFTMilestoneModel[];
    actionType: string
}

