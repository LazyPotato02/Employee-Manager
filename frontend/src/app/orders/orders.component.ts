import {Component} from '@angular/core';
import {AuthService} from '../services/auth/auth.service';
import {OrderService} from '../services/orders/order.service';
import {Orders} from '../types/orders/orders.interface';
import {NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
    selector: 'app-orders',
    imports: [
        NgForOf,
        NgIf,
        RouterLink
    ],
    templateUrl: './orders.component.html',
    standalone: true,
    styleUrl: './orders.component.css'
})
export class OrdersComponent {
    orders: Orders[] = []

    constructor(private ordersService: OrderService) {
    }

    ngOnInit() {
        this.fetchOrders()
    }

    fetchOrders(): void {
        this.ordersService.getOrders().subscribe({
            next: (data: Orders[]) => {
                this.orders = data;
            },
            error: (err: any) => {
                console.error('Error fetching orders:', err);
            }
        })
    }
}
