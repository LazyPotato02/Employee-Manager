import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Materials} from '../../types/materials/material.interface';

@Injectable({
    providedIn: 'root',
})
export class MaterialService {
    private apiUrl = 'http://localhost:8000/materials/';

    constructor(private http: HttpClient) {
    }

    getMaterials(): Observable<Materials[]> {
        return this.http.get<Materials[]>(`${this.apiUrl}`, {withCredentials: true})
    }

    getMaterial(materialId: string | undefined): Observable<Materials[]> {
        return this.http.get<Materials[]>(`${this.apiUrl}/${materialId}`, {withCredentials: true});
    }

    createMaterial(employee: any) {
        return this.http.post(this.apiUrl, employee, {withCredentials: true});
    }
}
