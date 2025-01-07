import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Orders} from '../../types/orders/orders.interface';

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

    createOrder(data: Orders): any {
        return this.http.post<Orders>(this.apiUrl, data, {withCredentials: true})
    }
}
