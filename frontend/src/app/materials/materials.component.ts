import { Component } from '@angular/core';
import {MaterialService} from '../services/material/material.service';
import {Materials} from '../types/materials/material.interface';
import {NgForOf, NgIf} from '@angular/common';

@Component({
    selector: 'app-materials',
    imports: [
        NgForOf,
        NgIf
    ],
    templateUrl: './materials.component.html',
    standalone: true,
    styleUrl: './materials.component.css'
})
export class MaterialsComponent {
    materials: Materials[] = []

    constructor(private materialService: MaterialService) {
    }

    ngOnInit() {
        this.fetchMaterials()
    }

    fetchMaterials(): void {
        this.materialService.getMaterials().subscribe({
            next: (data: Materials[]) => {
                this.materials = data;
            },
            error: (err: any) => {
                console.error('Error fetching materials:', err);
            }
        })
    }
}
