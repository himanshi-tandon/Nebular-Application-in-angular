import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private baseUrl = 'http://localhost:8080/api/v1/State';

  constructor(private http: HttpClient) { }

  getState(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createState(State : Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, State );
  }

  updateState(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  /* deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  } */

  getStateList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
