import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';


const baseUrl = 'http://127.0.0.1:8000/employee/';


@Injectable({
  providedIn: 'root'
  
})
export class EmployeeService {
  constructor(private http:HttpClient) { }
  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(baseUrl);
  }

  get(Employeeid: any): Observable<Employee> {
    return this.http.get<Employee>(`${baseUrl}/${Employeeid}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(Employeeid: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${Employeeid}`, data);
  }

  delete(Employeeid: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${Employeeid}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(employee: any): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${baseUrl}?employee=${employee}`);
  }
}
