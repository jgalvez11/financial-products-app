import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { IProduct } from 'src/app/models/interfaces/product';
import { IPaginator } from 'src/app/models/interfaces/paginator.interface';
import { EPaginator } from 'src/app/models/enums/paginator.enum';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  products: IProduct[] = [];

  displayedProducts: IProduct[] = [];
  totalResults = 0;
  itemsPerPage = 2;
  currentPage = 1;
  totalPages = 0;

  constructor(private productService: ApiService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      this.updateDisplayedProducts();
    });
  }

  updateDisplayedProducts(value?: IPaginator): void {
    if (value) {
      if (value.key === EPaginator.CURRENT_PAGE) {
        this.currentPage = value.value;
      }

      if (value.key === EPaginator.ITEMS_PER_PAGE) {
        this.currentPage = 1;
        this.itemsPerPage = value.value;
      }
    }

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedProducts = this.products.slice(startIndex, endIndex);
    this.totalResults = this.products.length;
    this.totalPages = Math.ceil(this.totalResults / this.itemsPerPage);
  }
}
