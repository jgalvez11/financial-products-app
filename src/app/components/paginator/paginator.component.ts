import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  EPaginator,
  ICON_OPTION_PAGINATOR,
} from '../../models/enums/paginator.enum';
import { IPaginator } from '../../models/interfaces/paginator.interface';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent {
  @Input() totalResults = 0;
  @Input() itemsPerPage = 5;
  @Input() currentPage = 1;
  @Input() totalPages = 0;
  @Output() updateDisplayedProducts = new EventEmitter<IPaginator>();
  iconOptions = ICON_OPTION_PAGINATOR;
  itemsNumberPerPage = [5, 10, 15];

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedProducts.emit({
        key: EPaginator.CURRENT_PAGE,
        value: this.currentPage,
      });
    }
  }

  changeItemsPerPage(event: any): void {
    const value = event?.target.value;
    this.itemsPerPage = parseInt(value, 10);
    this.updateDisplayedProducts.emit({
      key: EPaginator.ITEMS_PER_PAGE,
      value: this.itemsPerPage,
    });
  }
}
