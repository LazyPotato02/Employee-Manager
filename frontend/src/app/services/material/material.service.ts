import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Material} from '../../types/materials/material.interface';

@Injectable({
    providedIn: 'root',
})
export class MaterialService {
    private apiUrl = 'http://localhost:8000/materials/';

    constructor(private http: HttpClient) {
    }

    getMaterials(id: number): Observable<Material[]> {
        return this.http.get<Material[]>(`${this.apiUrl}/${id}`, {withCredentials: true})
    }

    // getMaterial(cellId: string | undefined): Observable<Material[]> {
    //     return this.http.get<Material[]>(`${this.apiUrl}cellemployees/${cellId}`, {withCredentials: true});
    // }

    createMaterial(employee: any) {
        return this.http.post(this.apiUrl, employee, {withCredentials: true});
    }
}
