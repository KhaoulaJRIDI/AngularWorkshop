import { Component } from '@angular/core';
import { ItemListComponent } from './components/item-list/item-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ItemListComponent],
  template: `<app-item-list></app-item-list>`,
})

export class AppComponent {
  title = 'AngularWorkshop';
}
