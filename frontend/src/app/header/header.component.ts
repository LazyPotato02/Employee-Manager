import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {NgIf} from '@angular/common';
import {AuthService} from '../auth/services/auth/auth.service';
import {FormsModule} from '@angular/forms';
import {OrderService} from '../auth/services/orders/order.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLoggedIn: boolean = false;
  isFormVisible = false;
  isAuthenticated = false;
  order = {
    order_name: '',
    quantity: 0,
    done_quantity: 0,
  };

  constructor(private authService: AuthService, private orderService:OrderService,) {
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isAuthenticated = loggedIn;
    });
  }

  openForm(event: Event) {
    event.preventDefault();
    if (this.isAuthenticated) {
      this.isFormVisible = true;
    } else {
      alert('You need to log in to create an order.');
    }
  }

  closeForm() {
    this.isFormVisible = false;
  }

  onSubmit() {
    if (!this.order.order_name || this.order.quantity <= 0) {
      alert('Please provide valid order details.');
      return;
    }
    this.orderService.createOrder(this.order).subscribe({
      next: (response:any) => {
        // Reset the form and hide the modal
        this.isFormVisible = false;
        this.order = { order_name: '', quantity: 0, done_quantity: 0 };
      },
      error: (err: any) => {
        console.error('Error creating order:', err);
        alert('Failed to create order. Please try again.');
      },
    });

  }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
  }

}
