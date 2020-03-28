import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  private baseUrl = 'http://localhost:8080/api/v1/Page';

  constructor(private http: HttpClient) { }

  getPage(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createPage(Page : Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, Page );
  }

  updatePage(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  /* deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  } */

  getPageList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
