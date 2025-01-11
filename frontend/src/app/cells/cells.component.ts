import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CellServices} from '../services/cells/cell.services';
import {Employee} from '../types/employee/employee.inferface';
import {EmployeeService} from '../services/employee/employee.service';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {Orders} from '../types/orders/orders.interface';
import {OrderService} from '../services/orders/order.service';

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
    allEmployees: (Employee & { checked?: boolean })[] = [];
    selectedEmployee: Employee | null = null;
    showEditForm: boolean = false;
    showDeleteConfirmation: boolean = false;
    showAddEmployeesPopup: boolean = false;
    showStartOrder: boolean = false;
    order: Orders = {id: '', order_name: '', quantity: 0, done_quantity: 0, working_cell: 0};

    constructor(
        private router: Router,
        private employeeService: EmployeeService,
        private cellService: CellServices,
        private orderService: OrderService,
        private route: ActivatedRoute
    ) {
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
    }

    ngOnInit(): void {
        if (this.id) {
            this.fetchCellEmployees();
            this.fetchAllEmployees();
        }
    }

    trackById(index: number, employee: Employee): string {
        return employee.id.toString();
    }

    fetchCellEmployees(): void {
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

    fetchAllEmployees(): void {
        this.employeeService.getAllEmployee().subscribe({
            next: (data: Employee[]) => {
                this.allEmployees = data
                    .filter(emp => {
                        const employeeCell = emp.cell ? String(emp.cell) : null;
                        const currentCellId = this.id ? String(this.id) : null;

                        return employeeCell !== currentCellId;
                    })
                    .map(emp => ({...emp, checked: false}));
            },
            error: (err) => {
                console.error('Error fetching all employees:', err);
            }
        });
    }

    openAddEmployeesPopup(): void {
        this.fetchAllEmployees();
        this.showAddEmployeesPopup = true;
    }

    closeAddEmployeesPopup(): void {
        this.showAddEmployeesPopup = false;
    }

    addSelectedEmployees(): void {
        const selectedEmployees = this.allEmployees.filter(emp => emp.checked);
        const updates = selectedEmployees.map(emp => ({
            ...emp,
            cell: this.id // Set their cell to the current cell
        }));

        this.employeeService.updateMultipleEmployees(updates).subscribe({
            next: () => {
                this.fetchCellEmployees(); // Refresh cell employees
                this.closeAddEmployeesPopup();
            },
            error: (err: any) => {
                console.error('Error updating employees:', err);
            }
        });
    }

    openEditForm(employee: Employee): void {
        this.selectedEmployee = {...employee};
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
                        this.employees[index] = {
                            cell: null,
                            first_name: '',
                            id: 0,
                            last_name: '', ...this.selectedEmployee
                        };
                    }
                    this.closeEditForm();
                    window.location.reload();
                },
                error: (err) => {
                    console.error('Error updating employee:', err);
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
                    this.router.navigate(['/']);
                },
                error: (err) => {
                    console.error('Error deleting cell:', err);
                }
            });
        }
    }

    removeAllEmployees(): void {
        if (this.employees.length === 0) {
            console.log('No employees to remove.');
            return;
        }

        const updates = this.employees.map(emp => ({
            ...emp,
            cell: '0'
        }));

        this.employeeService.updateMultipleEmployees(updates).subscribe({
            next: () => {
                console.log('All employees removed from the cell.');
                this.employees = [];
            },
            error: (err) => {
                console.error('Error removing employees from the cell:', err);
            }
        });
    }

    openStartForm() {
        this.showStartOrder = true;
        this.resetOrder();
    }

    resetOrder() {
        this.order = {id: '', order_name: '', quantity: 0, done_quantity: 0, working_cell: 0}
    }

    closeStartForm(): void {
        this.showStartOrder = false;
    }

    submitStartOrder(order: Orders): void {
        if (order.order_name) {
            this.orderService.getOrder(order.order_name).subscribe({
                next: (response: Orders) => {
                    this.order = { ...response }
                    if (this.id != null) {
                        this.order.working_cell = Number(this.id)
                    }
                    this.orderService.updateOrder(this.order).subscribe({
                        next: (response: Orders) => {
                            console.log(response);
                        },error: (err: any) => {
                            console.error('Error updating order:', err);
                        }
                    })
                }, error: (err: any) => {
                    console.error('Error updating order:', err);
                }
            })

        } else {
            console.error('Order name is required!');
        }
        this.closeStartForm();
    }

}
