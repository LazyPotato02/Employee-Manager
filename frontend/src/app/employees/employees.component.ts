import { Component } from '@angular/core';
import {Employee} from '../types/employee/employee.inferface';
import {EmployeeService} from '../services/employee/employee.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-employees',
    imports: [
        FormsModule,
        NgForOf,
        NgIf,
        ReactiveFormsModule
    ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {
    employees: Employee[] = []
    showEditForm = false;
    selectedEmployee: Employee | null = null;
    employeeToDelete: Employee | null = null;
    showDeleteConfirmation = false;

    constructor(private employeeService: EmployeeService) {
    }

    ngOnInit() {
        this.fetchOrders()
    }

    fetchOrders(): void {
        this.employeeService.getAllEmployee().subscribe({
            next: (data: Employee[]) => {
                this.employees = data.sort((a, b) => a.id - b.id);
            },
            error: (err: any) => {
                console.error('Error fetching employee:', err);
            }
        });;
    }

    openEditForm(employee: Employee): void {
        this.selectedEmployee = {
            id: employee.id || 0,
            first_name: employee.first_name || '',
            last_name: employee.last_name || '',
            cell: employee.cell || null
        };
        this.showEditForm = true;
    }

    closeEditForm(): void {
        this.showEditForm = false;
        this.selectedEmployee = null;
    }

    saveEdit(): void {
        if (this.selectedEmployee) {
            this.employeeService.updateEmployee(this.selectedEmployee).subscribe({
                next: () => {
                    const index = this.employees.findIndex(m => m.id === this.selectedEmployee!.id);
                    if (index > -1) {
                        this.employees[index] = {
                            id: this.selectedEmployee!.id,
                            first_name: this.selectedEmployee!.first_name,
                            last_name: this.selectedEmployee!.last_name,
                            cell: this.selectedEmployee!.cell,

                        };
                    }
                    this.closeEditForm();
                },
                error: (err: any) => {
                    console.error('Error updating order:', err);
                }
            });
        }
    }
    openDeleteConfirmation(employee: Employee): void {
        this.showDeleteConfirmation = true;
        this.employeeToDelete = employee;
    }

    confirmDelete(): void {
        if (this.employeeToDelete) {
            this.employeeService.deleteEmployee(this.employeeToDelete.id).subscribe({
                next: () => {
                    this.employees = this.employees.filter(employee => employee.id !== this.employeeToDelete!.id);
                    this.closeDeleteConfirmation();
                },
                error: (err: any) => {
                    console.error('Error deleting order:', err);
                }
            });
        }
    }

    closeDeleteConfirmation(): void {
        this.showDeleteConfirmation = false;
        this.employeeToDelete = null;
    }
}
