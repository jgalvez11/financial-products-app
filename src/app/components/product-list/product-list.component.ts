import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { IProduct } from '../../models/interfaces/product';
import { IPaginator } from '../../models/interfaces/paginator.interface';
import { EPaginator } from '../../models/enums/paginator.enum';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  products: IProduct[] = [];
  productsTemp: IProduct[] = [];
  isSearch: boolean = false;
  displayedProducts: IProduct[] = [];
  totalResults = 0;
  itemsPerPage = 5;
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

    const filterproducts = this.isSearch ? this.productsTemp : this.products;

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedProducts = filterproducts.slice(startIndex, endIndex);
    this.totalResults = filterproducts.length;
    this.totalPages = Math.ceil(this.totalResults / this.itemsPerPage);
    this.isSearch = false;
  }

  search(term: string) {
    this.productsTemp =
      term.trim() !== ''
        ? this.products.filter((product) =>
            Object.values(product).some((value) =>
              value.toString().toLowerCase().includes(term.toLowerCase())
            )
          )
        : [...this.products];

    this.isSearch = true;

    this.updateDisplayedProducts();
  }
}
