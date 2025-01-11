import { Component } from '@angular/core';
import { OrderService } from '../services/orders/order.service';
import { Orders } from '../types/orders/orders.interface';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
    orders: Orders[] = [];
    showEditForm = false;
    selectedOrder: Orders | null = null;
    showDeleteConfirmation = false;
    orderToDelete: Orders | null = null;

    constructor(private ordersService: OrderService) {}

    ngOnInit(): void {
        this.fetchOrders();
    }

    fetchOrders(): void {
        this.ordersService.getOrders().subscribe({
            next: (data: Orders[]) => {
                this.orders = data;
            },
            error: (err: any) => {
                console.error('Error fetching orders:', err);
            }
        });
    }

    openEditForm(order: Orders): void {
        this.selectedOrder = {
            id: order.id || '',
            order_name: order.order_name || '',
            quantity: order.quantity || 0,
            done_quantity: order.done_quantity || 0,
            working_cell: order.working_cell || '',
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
                    const index = this.orders.findIndex(order => order.id === this.selectedOrder?.id);
                    if (index > -1) {
                        this.orders[index] = {working_cell: '', done_quantity: 0, id: '', order_name: '', quantity: 0, ...this.selectedOrder };
                    }
                    this.closeEditForm();
                },
                error: (err: any) => {
                    console.error('Error updating order:', err);
                }
            });
        }
    }

    openDeleteConfirmation(order: Orders): void {
        this.showDeleteConfirmation = true;
        this.orderToDelete = order;
    }

    confirmDelete(): void {
        if (this.orderToDelete) {
            this.ordersService.deleteOrder(this.orderToDelete.id).subscribe({
                next: () => {
                    this.orders = this.orders.filter(order => order.id !== this.orderToDelete!.id);
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
        this.orderToDelete = null;
    }
}
