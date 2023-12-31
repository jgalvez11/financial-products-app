import { Component, Input } from '@angular/core';
import { IProduct } from '../../models/interfaces/product';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() displayedProducts: IProduct[] = [];

  removeItem(id: string) {
    this.displayedProducts = this.displayedProducts.filter(
      (product) => product.id !== id
    );
  }
}
