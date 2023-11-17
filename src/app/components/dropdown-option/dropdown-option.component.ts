import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../models/interfaces/product';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { EStorageData } from '../../models/enums/storage.enum';

@Component({
  selector: 'app-dropdown-option',
  templateUrl: './dropdown-option.component.html',
  styleUrls: ['./dropdown-option.component.scss'],
})
export class DropdownOptionComponent {
  @Input() product!: IProduct;
  @Output() delete = new EventEmitter<string>();
  modalConfirm: boolean = false;
  modalError: boolean = false;
  messageError!: string;

  constructor(private productService: ApiService, private router: Router) {}

  toggleModal(confirmDelete?: boolean) {
    if (confirmDelete) {
      this.productService.deleteProduct(this.product.id).subscribe({
        next: () => this.delete.emit(this.product.id),
        error: (err) => {
          this.messageError = `ERROR ${err.status} - ${
            err.error || err.message
          }`;
          this.modalError = true;
        },
      });
    }

    this.modalConfirm = !this.modalConfirm;
  }

  goToPageEdit() {
    localStorage.setItem(EStorageData.PRODUCT, JSON.stringify(this.product));
    this.router.navigate(['/form/' + this.product.id]);
  }
}
