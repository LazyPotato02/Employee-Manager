import {Component} from '@angular/core';
import {MaterialService} from '../services/material/material.service';
import {Materials} from '../types/materials/material.interface';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Orders} from '../types/orders/orders.interface';

@Component({
    selector: 'app-materials',
    imports: [
        NgForOf,
        NgIf,
        FormsModule
    ],
    templateUrl: './materials.component.html',
    standalone: true,
    styleUrl: './materials.component.css'
})
export class MaterialsComponent {
    materials: Materials[] = [];
    showEditForm = false;
    selectedMaterial: Materials | null = null;
    materialToDelete: Materials | null = null;
    showDeleteConfirmation = false;


    constructor(private materialService: MaterialService) {
    }

    ngOnInit() {
        this.fetchMaterials();
    }

    fetchMaterials(): void {
        this.materialService.getMaterials().subscribe({
            next: (data: Materials[]) => {
                this.materials = data;
            },
            error: (err: any) => {
                console.error('Error fetching materials:', err);
            }
        });
    }

    openEditForm(material: Materials): void {
        this.selectedMaterial = {
            id: material.id || '',
            material_name: material.material_name || '',
            quantity: material.quantity || 0
        };
        this.showEditForm = true;
    }

    closeEditForm(): void {
        this.showEditForm = false;
        this.selectedMaterial = null;
    }

    saveEdit(): void {
        if (this.selectedMaterial) {
            this.materialService.updateMaterial(this.selectedMaterial).subscribe({
                next: () => {
                    const index = this.materials.findIndex(m => m.id === this.selectedMaterial!.id);
                    if (index > -1) {
                        this.materials[index] = {
                            id: this.selectedMaterial!.id,
                            material_name: this.selectedMaterial!.material_name,
                            quantity: this.selectedMaterial!.quantity
                        };
                    }
                    this.closeEditForm();
                },
                error: (err: any) => {
                    console.error('Error updating material:', err);
                }
            });
        }
    }

    openDeleteConfirmation(material: Materials): void {
        this.showDeleteConfirmation = true;
        this.materialToDelete = material;
    }

    confirmDelete(): void {
        if (this.materialToDelete) {
            this.materialService.deleteMaterial(this.materialToDelete.id).subscribe({
                next: () => {
                    this.materials = this.materials.filter(order => order.id !== this.materialToDelete!.id);
                    this.closeDeleteConfirmation();
                },
                error: (err: any) => {
                    console.error('Error deleting order:', err);
                }
            });
        }
    }

    closeDeleteConfirmation(): void {
        this.showDeleteConfirmation = false;
        this.materialToDelete = null;
    }
}
