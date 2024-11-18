import { Routes } from '@angular/router';
import { ItemListComponent } from './components/item-list/item-list.component'; // Import your components

// Define routes for your application
export const appRoutes: Routes = [
  { path: '', component: ItemListComponent },  // Default route (Home page)
  { path: '**', redirectTo: '' }               // Wildcard route for unmatched paths
];

