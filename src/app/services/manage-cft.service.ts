import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { CFTDetailsModel } from '../@core/models/cftdetails.model';
import { CFTPostRequestDataModel } from '../@core/models/cft-postrequest.model';
import { CFTCategoryModel } from '../@core/models/cft-category.model';
import { departmentModel } from '../@core/models/department.model';
import { CFTMilestoneModel } from '../@core/models/cftmilestones.model';
@Injectable({
  providedIn: 'root'
})
export class ManageCftService {
  cftRecord: BehaviorSubject<CFTDetailsModel> = new BehaviorSubject(new CFTDetailsModel());

  constructor(private http: HttpClient) { }

  getAllCFTDetails(): Observable<CFTDetailsModel[]> {
    return this.http.get<CFTDetailsModel[]>(`${environment.apiUrl}CFTMonitoringApi-v1/api/importedcft`);
  }

  setCFTRecordStateForEdit(selectedCFT: CFTDetailsModel): Observable<any> {
    this.cftRecord.next(selectedCFT);
    return this.cftRecord;
  }

  getCFT(scrNo: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}CFTMonitoringApi-v1/api/cft${scrNo}`);
  }

  getCategoryList(): Observable<CFTCategoryModel[]> {
    return this.http.get<CFTCategoryModel[]>(`${environment.apiUrl}CategoryApi-v1/api/getcategories/ASIA/IB`);
  }

  getMilestoneListByDepartment(): Observable<CFTMilestoneModel[]> {
    return this.http.get<CFTMilestoneModel[]>(`${environment.apiUrl}DepartmentApi-v2.0/api/deptmilestones/IB`);
  }

  getUserListByDepartment(): Observable<departmentModel[]> {
    return this.http.get<departmentModel[]>(`${environment.apiUrl}DepartmentApi-v2.0/api/deptusers/IB`);
  }

  postCFTUpdate(postData: CFTDetailsModel): Observable<any> {
    return this.http.post<CFTDetailsModel>(`${environment.apiUrl}CFTMonitoringApi-v1/api/cftupdate`,postData);
  }
  postCFTMilestone(postData: CFTPostRequestDataModel): Observable<CFTPostRequestDataModel> {
    return this.http.post<CFTPostRequestDataModel>(`${environment.apiUrl}CFTMonitoringApi-v1/api/savedraft`, postData);
  }


}
