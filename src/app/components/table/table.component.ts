import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/models/interfaces/product';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() displayedProducts: IProduct[] = [];
}
