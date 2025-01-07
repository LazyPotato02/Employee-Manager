import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CellServices} from '../services/cells/cell.services';
import {Employee} from '../types/employee/employee.inferface';
import {EmployeeService} from '../services/employee/employee.service';

@Component({
    selector: 'app-cells',
    imports: [],
    templateUrl: './cells.component.html',
    standalone: true,
    styleUrl: './cells.component.css'
})
export class CellsComponent {
    id: string | undefined;
    employees?: Employee[];

    constructor(private router: Router, private employeeService: EmployeeService, private cellService: CellServices, private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
    }

    ngOnInit() {
        this.employeeService.getCellEmployees(this.id).subscribe({
            next: (data: Employee[]) => {
                this.employees = data;
            },
            error: (err) => {
                console.error('Error fetching employees:', err);
            }
        });
    }
}
