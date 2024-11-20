import { Component, OnInit } from '@angular/core';
import {CommonModule, CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item.model';


@Component({
  selector: 'app-item-list',
  standalone: true,
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
  imports: [
    CurrencyPipe,
    NgForOf,
    NgIf,
    FormsModule
  ],

})



export class ItemListComponent implements OnInit {
  items: Item[] = [];
  //newItem = { name: '', price: 0};
  Item = {name: '', price: 0 , description:''};
  isLoading: boolean = true;  // Property to track if data is loading
  errorMessage: string | null = null;


  newItem: Item = { _id: '', name: '', price: 0, description: '' };  // _id initialized
  //currentItem: Item = { _id: '', name: '', price: 0, description: '' };  // _id initialized
  currentItem: Item | null = null;  // Initialize as null
  constructor(private itemService: ItemService) {

  }


  ngOnInit(): void {
    this.fetchItems();
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
// Set currentItem when editing
  openEditModal(item: Item): void {
    this.currentItem = { ...item };  // Set currentItem to the item to be edited
  }

  // Set currentItem when deleting
  openDeleteModal(item: Item): void {
    this.currentItem = item;  // Set currentItem to the item to be deleted
  }
  addItem(): void {
    if (this.newItem.name && this.newItem.price) {
      this.itemService.addItem(this.newItem).subscribe({
        next: (newItem) => {
          this.items.push(newItem); // Add the new item locally
          this.newItem = { name: '', price: 0 , description:''}; // Reset the form
          this.loadItems();
        },
        error: (err) => {
          console.error('Error adding item:', err);
          this.errorMessage = 'Failed to add the item.';
        },
      });
    }
  }

  editItem(item: Item): void {
    if (item._id) {
      this.itemService.updateItem(item._id, item).subscribe({
        next: (updatedItem) => {
          const index = this.items.findIndex((i) => i._id === updatedItem._id);
          if (index > -1) {
            this.items[index] = updatedItem; // Update the item locally
          }
        },
        error: (err) => {
          console.error('Error updating item:', err);
          this.errorMessage = 'Failed to update the item.';
        },
      });
    } else {
      console.error('Item ID is undefined');
    }
  }

  deleteItem(id?: string): void {
    if (id) {  // Check if _id is defined
      this.itemService.deleteItem(id).subscribe({
        next: () => {
          this.items = this.items.filter((item) => item._id !== id); // Remove locally
        },
        error: (err) => {
          console.error('Error deleting item:', err);
          this.errorMessage = 'Failed to delete the item.';
        },
      });
    }
    else {
      console.error('Item ID is undefined');
    }
  }




  // Define trackItem method for trackBy

  trackItem(index: number, item: Item): string {
    return item._id || 'placeholder-id';  // Use a fallback unique value
  }



}
