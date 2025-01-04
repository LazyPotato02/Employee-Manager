import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from '../../types/employee/employee.inferface';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8000/employee/';

  constructor(private http: HttpClient) {
  }

  getEmployee(id: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/${id}`, {withCredentials: true})
  }

  getCellEmployees(cellId: string | undefined): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}cellemployees/${cellId}`, {withCredentials: true});
  }

  createEmployee(employee: any) {
    return this.http.post(this.apiUrl, employee, {withCredentials: true});
  }
}
