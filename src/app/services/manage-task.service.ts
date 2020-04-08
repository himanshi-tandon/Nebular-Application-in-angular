import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CFTDetailsModel } from '../@core/models/cftdetails.model';
import { TaskByUserModel, PostNewRemarkForTask } from '../@core/models/task-by-user.model';
import { id } from '@swimlane/ngx-charts/release/utils';
import { CFTRemarksModel, CFTMilestoneModel } from '../@core/models/cftmilestones.model';

@Injectable({
    providedIn: 'root'
})
export class ManageTaskService {

    constructor(private http: HttpClient) { }

    getTaskList(): Observable<CFTDetailsModel[]> {
        return this.http.get<CFTDetailsModel[]>(`${environment.apiUrl}CFTMonitoringApi-v1/api/importedcft`);
    }


    getTaskByUser(Id: number): Observable<TaskByUserModel[]> {
        return this.http.get<TaskByUserModel[]>(`${environment.apiUrl}CFTMonitoringApi-v1/api/gettasksbyuser/${Id}`);
    }

    postSaveRemarks(postData: PostNewRemarkForTask): Observable<CFTDetailsModel[]> {
        console.log(JSON.stringify(postData));
        return this.http.post<CFTDetailsModel[]>(`${environment.apiUrl}CFTMonitoringApi-v1/api/addremarks`, postData);
    }


}
