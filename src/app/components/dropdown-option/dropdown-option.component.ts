import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/models/interfaces/product';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dropdown-option',
  templateUrl: './dropdown-option.component.html',
  styleUrls: ['./dropdown-option.component.scss'],
})
export class DropdownOptionComponent {
  modalConfirm: boolean = false;
  modalError: boolean = false;
  messageError!: string;
  @Input() product!: IProduct;
  @Output() delete = new EventEmitter<string>();

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
}
