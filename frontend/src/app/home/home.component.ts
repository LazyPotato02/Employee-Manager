import {Component} from '@angular/core';
import {Cells} from './types/cell.interface';
import {HomeService} from '../auth/services/home/home.service';
import {Observable} from 'rxjs';
import {JsonPipe, NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    JsonPipe,
    NgIf,
    NgForOf,
    RouterLink
  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css'
})
export class HomeComponent {

  cells: Cells[]=[];

  constructor(private homeService: HomeService) {
  }

  ngOnInit() {
    this.fetchCells()
  }

  fetchCells() {
    this.homeService.getCells().subscribe(
      (data: Cells[]) => {
        this.cells = data;
        console.log('Cells:', data);
      },
      (error) => {
        console.error('Error fetching cells:', error);
      }
    );
  }
}
