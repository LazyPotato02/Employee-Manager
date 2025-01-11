import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Orders} from '../../types/orders/orders.interface';
import {Materials} from '../../types/materials/material.interface';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private apiUrl = 'http://localhost:8000/orders/'

    constructor(private http: HttpClient) {
    }

    getOrders(): any {
        return this.http.get<Orders[]>(this.apiUrl, {withCredentials: true})
    }

    getOrder(orderName: string | undefined): any {
        return this.http.get<Orders>(`${this.apiUrl}getStartOrder/${orderName}`, {withCredentials: true})
    }
    updateOrder(order: Orders): Observable<Orders> {
        return this.http.put<Orders>(`${this.apiUrl}${order.id}`, order, {withCredentials: true});
    }
    createOrder(data: Orders): any {
        return this.http.post<Orders>(this.apiUrl, data, {withCredentials: true})
    }
    deleteOrder(orderId: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}${orderId}`,{withCredentials: true});
    }
}
