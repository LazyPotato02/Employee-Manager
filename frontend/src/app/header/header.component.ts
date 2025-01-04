import { AuthService } from '../services/auth/auth.service';
import { OrderService } from '../services/orders/order.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {CellServices} from '../services/cells/cell.services';
import {EmployeeService} from '../services/employee/employee.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  isFormVisible = false;
  isDropdownVisible = false;
  isAuthenticated = false;
  selectedOption: string = '';
  activeForm: 'order' | 'cell' | 'employee' | null = null;

  order = {
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

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private cellService: CellServices, // Inject CellService
    private employeeService: EmployeeService // Inject EmployeeService
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

  create(type: 'order' | 'cell' | 'employee') {
    this.closeDropdown();
    if (!this.isAuthenticated) {
      alert('You need to log in to perform this action.');
      return;
    }
    this.activeForm = type;
    this.isFormVisible = true;
  }

  closeForm() {
    this.isFormVisible = false;
    this.activeForm = null;
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
      default:
        console.error('Unknown form type.');
    }
  }

  createOrder() {
    if (!this.order.order_name || this.order.quantity <= 0) {
      alert('Please provide valid order details.');
      return;
    }
    this.orderService.createOrder(this.order).subscribe({
      next: (response: any) => {
        this.isFormVisible = false;
        this.order = { order_name: '', quantity: 0, done_quantity: 0 };
      },
      error: (err: any) => {
        console.error('Error creating order:', err);
        alert('Failed to create order. Please try again.');
      },
    });
  }

  createCell() {
    const trimmedName = this.cell.name.trim(); // Trim spaces
    if (!trimmedName) {
      alert('Please provide a valid cell name.');
      return;
    }
    this.cellService.createCell(this.cell).subscribe({
      next: (response: any) => {
        this.isFormVisible = false;
        this.cell = { name: '' };
      },
      error: (err: any) => {
        console.error('Error creating cell:', err);
        alert('Failed to create cell. Please try again.');
      },
    });
  }

  createEmployee() {
    if (!this.employee.first_name || !this.employee.last_name) {
      alert('Please provide valid employee details.');
      return;
    }
    this.employeeService.createEmployee(this.employee).subscribe({
      next: (response: any) => {
        this.isFormVisible = false;
        this.employee = { first_name: '', last_name: '', cell: null };
      },
      error: (err: any) => {
        console.error('Error creating employee:', err);
        alert('Failed to create employee. Please try again.');
      },
    });
  }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }
}
