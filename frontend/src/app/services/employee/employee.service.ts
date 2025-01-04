import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from '../../types/employee/employee.inferface';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8000/employee/';

  constructor(private http: HttpClient) {}

  getEmployee():Observable<Employee[]>{
    return this.http.get<Employee[]>(this.apiUrl,{withCredentials: true})
  }
  createEmployee(employee: any) {
    return this.http.post(this.apiUrl, employee, {withCredentials: true});
  }
}
