import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CellServices } from '../services/cells/cell.services';
import { Employee } from '../types/employee/employee.inferface';
import { EmployeeService } from '../services/employee/employee.service';
import { FormsModule } from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';

@Component({
    selector: 'app-cells',
    imports: [
        FormsModule,
        NgIf,
        NgForOf
    ],
    templateUrl: './cells.component.html',
    standalone: true,
    styleUrls: ['./cells.component.css']
})

export class CellsComponent {
    id: string | undefined;
    employees: Employee[] = [];
    selectedEmployee: Employee | null = null;
    showEditForm: boolean = false;
    showDeleteConfirmation: boolean = false;

    constructor(
        private router: Router,
        private employeeService: EmployeeService,
        private cellService: CellServices,
        private route: ActivatedRoute
    ) {
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
    }

    ngOnInit(): void {
        if (this.id) {
            this.employeeService.getCellEmployees(this.id).subscribe({
                next: (data: Employee[]) => {
                    this.employees = data;
                },
                error: (err) => {
                    console.error('Error fetching employees:', err);
                }
            });
        }
    }

    trackById(index: number, employee: Employee): string {
        return employee.id.toString();
    }

    openEditForm(employee: Employee): void {
        this.selectedEmployee = { ...employee };
        this.showEditForm = true;
    }

    closeEditForm(): void {
        this.showEditForm = false;
        this.selectedEmployee = null;
    }

    saveCellEdit(): void {
        if (this.selectedEmployee) {
            this.employeeService.updateEmployee(this.selectedEmployee).subscribe({
                next: () => {
                    const index = this.employees.findIndex(e => e.id === this.selectedEmployee?.id);
                    if (index > -1) {
                        this.employees[index] = {cell: null, first_name: '', id: 0, last_name: '', ...this.selectedEmployee };
                    }
                    this.closeEditForm();
                },
                error: (err: any) => {
                    console.error('Error updating cell:', err);
                }
            });
        }
    }

    openDeleteCellConfirmation(): void {
        this.showDeleteConfirmation = true;
    }

    closeDeleteCellConfirmation(): void {
        this.showDeleteConfirmation = false;
    }

    confirmDeleteCell(): void {
        if (this.id) {
            this.cellService.deleteCell(this.id).subscribe({
                next: () => {
                    console.log(`Cell ${this.id} deleted successfully.`);
                    this.router.navigate(['/']);
                },
                error: (err) => {
                    console.error(`Error deleting cell ${this.id}:`, err);
                }
            });
        }
    }
}
