import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { CFTDetailsModel } from '../@core/models/cftdetails.model';
import { CFTPostRequestDataModel } from '../@core/models/cft-postrequest.model';
@Injectable({
  providedIn: 'root'
})
export class ManageCftService {
  cftRecord: BehaviorSubject<CFTDetailsModel> = new BehaviorSubject(new CFTDetailsModel());

  constructor(private http: HttpClient) { }

  getCFTDetails(): Observable<CFTDetailsModel[]> {
    return this.http.get<CFTDetailsModel[]>(environment.apiUrl + 'Values');
  }

  setCFTRecordStateForEdit(selectedCFT: CFTDetailsModel): Observable<any> {
    this.cftRecord.next(selectedCFT);
    return this.cftRecord;
  }

  cftPostRequestData(postData: CFTPostRequestDataModel): Observable<any> {
    console.log(JSON.stringify(postData));
    return this.http.post<any>(environment.apiUrl, postData);
  }
}
