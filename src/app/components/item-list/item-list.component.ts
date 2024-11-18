import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div>
      <h1>Items List</h1>


      <!-- Items Table -->
      <table *ngIf="!isLoading" class="table table-striped table-bordered table-hover table-sm">
        <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
          <th scope="col">Description</th>
          <th scope="col">Actions</th>
        </tr>
        <tbody>
  <!--    <div *ngIf="errorMessage" class="error-message"> &lt;!&ndash; Display error message &ndash;&gt;
        {{ errorMessage }}
      </div>-->
        <!-- Show data rows when items are available -->
        <tr *ngFor="let item of items; let i = index">
          <td>{{ i + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.price | currency }}</td>
          <td>{{ item.description }}</td>

          <td>
            <button type="button" class="btn btn-warning btn-sm" (click)="addItem()">Edit</button>
            <button type="button" class="btn btn-danger btn-sm" (click)="deleteItem(item.id)">Delete</button>
          </td>
        </tr>


        <!-- Data rows go here -->
        </tbody>
      </table>

      <!-- No Items Message -->
      <div *ngIf="!isLoading && items.length === 0" class="text-center text-muted">
        No items available.
      </div>



    </div>
  `,
})


export class ItemListComponent implements OnInit {
  items: Item[] = [];
  newItem = { name: '', price: 0};
  Item = { name: '', price: 0 , description:''};
  isLoading: boolean = true;  // Property to track if data is loading
  errorMessage: string | null = null;
  constructor(private itemService: ItemService) {

  }


  ngOnInit(): void {
    this.fetchItems();  // Fetch the items when the component is initialized
  }

  // Fetch items from the backend
  fetchItems(): void {
    this.itemService.getItems().subscribe({
      next: (data) => {
        console.log('Fetched items:', data);  // Log the response
        this.items = data;  // Store the fetched items
        this.isLoading = false;  // Hide the loading indicator
      },
      error: (err) => {
        console.error('Error fetching items:', err);  // Log the error
        this.errorMessage = 'Failed to load items';  // Set the error message
        this.isLoading = false;  // Hide the loading indicator
      },
    });
  }
  loadItems(): void {
    this.itemService.getItems().subscribe((data) => (this.items = data));
  }
  isLoader(): boolean {
    return this.isLoading;
  }
  addItem(): void {
    if (this.newItem.name && this.newItem.price) {
      this.itemService.addItem(this.newItem).subscribe(() => {
        this.newItem = { name: '', price: 0 };
        this.loadItems();
      });
    }
  }

  deleteItem(id: number): void {
    this.itemService.deleteItem(id).subscribe(() => this.loadItems());
  }


  // Define trackItem method for trackBy
  trackItem(index: number, item: any): number {
    return item.id;  // Use a unique property, like 'id', to track the item
  }


}
