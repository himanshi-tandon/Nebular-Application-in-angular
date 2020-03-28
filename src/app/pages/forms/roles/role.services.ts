import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private baseUrl = 'http://localhost:8080/api/v1/Role';

  constructor(private http: HttpClient) { }

  getRole(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createRole(Role : Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, Role );
  }

  updateRole(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  /* deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  } */

  getRoleList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
