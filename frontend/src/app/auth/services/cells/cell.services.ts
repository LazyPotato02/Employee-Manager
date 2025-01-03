import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Cells} from '../../../types/cells/cell.interface';

@Injectable({
  providedIn: 'root'
})
export class CellServices {
  private apiUrl = 'http://localhost:8000/cells'
  constructor(private http: HttpClient) {
  }

  getCells():Observable<Cells[]>{
    return this.http.get<Cells[]>(this.apiUrl,{withCredentials: true})
  }


}
