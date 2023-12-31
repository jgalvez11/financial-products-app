import { Component, OnInit } from '@angular/core';
import {
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { EStorageData } from '../../models/enums/storage.enum';
import { IProduct } from '../../models/interfaces/product';
import { ConvertDateService } from '../../services/utils/convert-date.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  minDate!: string;
  productId: string | null;

  constructor(
    private fb: FormBuilder,
    private productService: ApiService,
    private router: Router,
    private convertDate: ConvertDateService,
    private activatedRoute: ActivatedRoute
  ) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.initForm();
    this.convertDate.calculateDateRevision(this.productForm);
    this.validateIsNewOrEdit();
  }

  private initForm() {
    this.productForm = this.fb.group({
      id: [
        { value: '', disabled: this.productId ? true : false },
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
        this.productId ? null : this.checkIdAvailability(),
      ],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
        ],
      ],
      logo: ['', Validators.required],
      date_release: ['', Validators.required],
      date_revision: [{ value: '', disabled: true }, Validators.required],
    });
  }

  checkIdAvailability(): AsyncValidatorFn {
    return (control): Observable<{ [key: string]: any } | null> => {
      const id = control.value;
      return this.productService.checkAvailability(id).pipe(
        map((isNotAvailable: boolean) => {
          return isNotAvailable ? { idNotAvailable: true } : null;
        }),
        catchError(() => of({ idNotAvailable: true }))
      );
    };
  }

  validateIsNewOrEdit() {
    if (this.productId) {
      const product: IProduct = JSON.parse(
        localStorage.getItem(EStorageData.PRODUCT) as string
      );

      if (product && product.id === this.productId) {
        product.date_release = new Date(product.date_release)
          .toISOString()
          .split('T')[0];
        product.date_revision = new Date(product.date_revision)
          .toISOString()
          .split('T')[0];
        this.productForm.setValue(product);
      } else {
        this.navigateToFormPage();
      }
    }
  }

  public navigateToFormPage(): void {
    this.router.navigate(['/form']);
  }

  save() {
    if (this.productForm.invalid) {
      return;
    }

    this.productForm.get('date_revision')?.enable();

    if (this.productId) {
      this.productForm.get('id')?.enable();
      this.productService
        .updateProduct(this.productForm.value)
        .subscribe(() => {
          this.router.navigate(['/products']);
        });
    } else {
      this.productService.saveProduct(this.productForm.value).subscribe(() => {
        this.router.navigate(['/products']);
      });
    }
  }

  resetForm() {
    const id: string = this.productForm.get('id')?.value;
    this.productForm.reset();

    if (this.productId) {
      this.productForm.get('id')?.setValue(id);
    }
  }
}
