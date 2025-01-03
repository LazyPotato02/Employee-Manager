import {Component} from '@angular/core';
import {Cells} from '../types/cells/cell.interface';
import {CellServices} from '../auth/services/cells/cell.services';
import {NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-cells',
  imports: [
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

  constructor(private homeService: CellServices) {
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
