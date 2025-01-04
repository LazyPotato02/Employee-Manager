import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CellServices} from '../services/cells/cell.services';

@Component({
  selector: 'app-cells',
  imports: [],
  templateUrl: './cells.component.html',
  standalone: true,
  styleUrl: './cells.component.css'
})
export class CellsComponent {
  id: string | undefined;

  constructor(private router: Router, private cellService: CellServices, private route: ActivatedRoute) {

  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }
}
