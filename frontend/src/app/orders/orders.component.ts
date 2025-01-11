import {Component} from '@angular/core';
import {OrderService} from '../services/orders/order.service';
import {Orders} from '../types/orders/orders.interface';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
    selector: 'app-orders',
    imports: [
        NgForOf,
        NgIf,
        FormsModule,
        ReactiveFormsModule,
    ],
    templateUrl: './orders.component.html',
    standalone: true,
    styleUrl: './orders.component.css'
})
export class OrdersComponent {
    orders: Orders[] = []
    showEditForm = false;
    selectedOrder: Orders | null = null;
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

    openEditForm(order: Orders): void {
        this.selectedOrder = {
            id: order.id || '',
            order_name: order.order_name || '',
            quantity: order.quantity || 0,
            done_quantity: order.done_quantity || 0
        };
        this.showEditForm = true;
    }

    closeEditForm(): void {
        this.showEditForm = false;
        this.selectedOrder = null;
    }

    saveEdit(): void {
        if (this.selectedOrder) {
            this.ordersService.updateOrder(this.selectedOrder).subscribe({
                next: () => {
                    const index = this.orders.findIndex(m => m.id === this.selectedOrder!.id);
                    if (index > -1) {
                        this.orders[index] = {
                            id: this.selectedOrder!.id,
                            order_name: this.selectedOrder!.order_name,
                            quantity: this.selectedOrder!.quantity,
                            done_quantity: this.selectedOrder!.done_quantity,

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
}
