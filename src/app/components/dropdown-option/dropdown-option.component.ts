import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProduct } from '../../models/interfaces/product';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { EStorageData } from 'src/app/models/enums/storage.enum';

@Component({
  selector: 'app-dropdown-option',
  templateUrl: './dropdown-option.component.html',
  styleUrls: ['./dropdown-option.component.scss'],
})
export class DropdownOptionComponent implements OnInit {
  @Input() product!: IProduct;
  @Output() delete = new EventEmitter<string>();
  modalConfirm: boolean = false;
  modalError: boolean = false;
  messageError!: string;

  constructor(private productService: ApiService, private router: Router) {}

  ngOnInit(): void {
    console.log(this.product);
  }

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
    console.log(this.product.id);
    localStorage.setItem(EStorageData.PRODUCT, JSON.stringify(this.product));
    this.router.navigate(['/form/' + this.product.id]);
  }
}
