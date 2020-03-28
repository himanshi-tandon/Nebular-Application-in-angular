import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContinentService {

  private baseUrl = 'http://localhost:8080/api/v1/Continent';

  constructor(private http: HttpClient) { }

  getContinent(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createContinent(Continent : Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, Continent );
  }

  updateContinent(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  /* deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  } */

  getContinentList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
