import { CFTDetailsModel } from './cftdetails.model';
import { CFTMilestoneModel } from './cftmilestones.model';
import { MessageDtoModel } from './messageDto.model';

export class CFTPostRequestDataModel {
    cftDetails: CFTDetailsModel;
    cftMileStoneData: CFTMilestoneModel[];
    actionType: string
    messageDto: MessageDtoModel;
}

