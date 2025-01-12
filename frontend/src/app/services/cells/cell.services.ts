import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Cells} from '../../types/cells/cell.interface';

@Injectable({
    providedIn: 'root'
})
export class CellServices {
    private apiUrl = 'http://localhost:8000/cells/'

    constructor(private http: HttpClient) {
    }

    getCells(): Observable<Cells[]> {
        return this.http.get<Cells[]>(this.apiUrl, {withCredentials: true})
    }

    getCell(cellId: string | undefined): Observable<Cells[]> {
        return this.http.get<Cells[]>(`${this.apiUrl}${cellId}`, {withCredentials: true})
    }

    createCell(cell: any) {
        return this.http.post(this.apiUrl, cell, {withCredentials: true});
    }

    updateCellWorkingStatus(cellId: string | undefined, updateCellWorkingStatus: { job: any }) {
        return this.http.patch(`${this.apiUrl}${cellId}`, updateCellWorkingStatus, {withCredentials: true});
    }

    deleteCell(cellId: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}${cellId}`, {withCredentials: true});
    }
}
