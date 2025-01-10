import {AuthService} from '../services/auth/auth.service';
import {OrderService} from '../services/orders/order.service';
import {Component, HostListener, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgIf, TitleCasePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CellServices} from '../services/cells/cell.services';
import {EmployeeService} from '../services/employee/employee.service';
import {MaterialService} from '../services/material/material.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink, NgIf, FormsModule, TitleCasePipe],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
    isLoggedIn: boolean = false;
    isFormVisible = false;
    isDropdownVisible = false;
    isAuthenticated = false;
    activeForm: 'order' | 'cell' | 'employee' | 'materials' | null = null;
    errorMessage: string | null = null;

    order = {
        id: '',
        order_name: '',
        quantity: 0,
        done_quantity: 0,
    };

    cell = {
        name: '',
    };

    employee = {
        first_name: '',
        last_name: '',
        cell: null,
    };
    material ={
        material_name: '',
        quantity: 0,
    }

    constructor(
        private authService: AuthService,
        private orderService: OrderService,
        private cellService: CellServices,
        private employeeService: EmployeeService,
        private materialService: MaterialService,
    ) {
        this.authService.isLoggedIn$.subscribe((loggedIn) => {
            this.isAuthenticated = loggedIn;
        });
    }

    openDropdown() {
        this.isDropdownVisible = true;
    }

    closeDropdown() {
        this.isDropdownVisible = false;
    }

    create(type: 'order' | 'cell' | 'employee' | 'materials') {
        this.closeDropdown();
        if (!this.isAuthenticated) {
            this.errorMessage = 'You need to log in to perform this action.';
            return;
        }
        this.activeForm = type;
        this.isFormVisible = true;
    }

    closeForm() {
        this.isFormVisible = false;
        this.activeForm = null;
        this.errorMessage = null;
    }

    onSubmit($event: SubmitEvent) {
        switch (this.activeForm) {
            case 'order':
                this.createOrder();
                break;
            case 'cell':
                this.createCell();
                break;
            case 'employee':
                this.createEmployee();
                break;
            case 'materials':
                this.createMaterials();
                break;
            default:
                console.error('Unknown form type.');
        }
    }

    createOrder() {
        if (!this.order.order_name || this.order.quantity <= 0) {
            this.errorMessage = 'Please provide valid order details.';
            return;
        }
        this.orderService.createOrder(this.order).subscribe({
            next: (response: any) => {
                this.isFormVisible = false;
                this.errorMessage = null;
                this.order = { id: '',order_name: '', quantity: 0, done_quantity: 0};
                window.location.reload()
            },
            error: (err: any) => {
                console.error('Error creating order:', err);
                this.errorMessage = 'Failed to create order. Please try again.';
            },
        });
    }

    createCell() {
        const trimmedName = this.cell.name.trim();
        if (!trimmedName) {
            this.errorMessage = 'Please provide a valid cell name.';
            return;
        }
        this.cellService.createCell(this.cell).subscribe({
            next: (response: any) => {
                this.isFormVisible = false;
                this.errorMessage = null;
                this.cell = {name: ''};
                window.location.reload()
            },
            error: (err: any) => {
                console.error('Error creating cell:', err);
                this.errorMessage = 'Failed to create cell. Please try again.';
            },
        });
    }

    createEmployee() {
        if (!this.employee.first_name || !this.employee.last_name) {
            this.errorMessage = 'Please provide valid employee details.';
            return;
        }
        this.employeeService.createEmployee(this.employee).subscribe({
            next: (response: any) => {
                this.isFormVisible = false;
                this.errorMessage = null;
                this.employee = {first_name: '', last_name: '', cell: null};
                window.location.reload()
            },
            error: (err: any) => {
                console.error('Error creating employee:', err);
                this.errorMessage = 'Failed to create employee. Please try again.';
            },
        });
    }

    createMaterials() {
        if (!this.material.material_name || this.material.quantity <= 0) {
            this.errorMessage = 'Please provide valid order details.';
            return;
        }
        this.materialService.createMaterial(this.material).subscribe({
            next: (response: any) => {
                this.isFormVisible = false;
                this.errorMessage = null;
                this.material = {material_name: '', quantity: 0};
                window.location.reload()
            },
            error: (err: any) => {
                console.error('Error creating order:', err);
                this.errorMessage = 'Failed to create order. Please try again.';
            },
        });
    }

    ngOnInit(): void {
        this.authService.isLoggedIn$.subscribe((loggedIn) => {
            this.isLoggedIn = loggedIn;
        });
    }
}
