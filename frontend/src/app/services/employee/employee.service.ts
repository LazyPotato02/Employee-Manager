import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from '../../types/employee/employee.inferface';
import {Orders} from '../../types/orders/orders.interface';

@Injectable({
    providedIn: 'root',
})
export class EmployeeService {
    private apiUrl = 'http://localhost:8000/employee/';

    constructor(private http: HttpClient) {
    }

    getAllEmployee(): Observable<Employee[]> {
        return this.http.get<Employee[]>(`${this.apiUrl}`, {withCredentials: true})
    }
    getEmployee(id: number): Observable<Employee[]> {
        return this.http.get<Employee[]>(`${this.apiUrl}/${id}`, {withCredentials: true})
    }
    updateEmployee(employee: Employee): Observable<Employee> {
        return this.http.put<Employee>(`${this.apiUrl}${employee.id}`, employee, {withCredentials: true});
    }
    getCellEmployees(cellId: string | undefined): Observable<Employee[]> {
        return this.http.get<Employee[]>(`${this.apiUrl}cellemployees/${cellId}`, {withCredentials: true});
    }
    createEmployee(employee: any) {
        return this.http.post(this.apiUrl, employee, {withCredentials: true});
    }
    deleteEmployee(employeeId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${employeeId}`);
    }
}
