import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  minDate!: string;

  constructor(
    private fb: FormBuilder,
    private productService: ApiService,
    private router: Router,
    private datePipe: DatePipe
  ) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      id: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
        this.checkIdAvailability(),
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
      date_release: ['', Validators.required], // Igual o mayor a la fecha actual
      date_revision: [{ value: '', disabled: true }, Validators.required], // Un anio posterior a la fecha de liberacion
    });

    this.calculateDateRevision();
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

  calculateDateRevision() {
    this.productForm
      .get('date_release')
      ?.valueChanges.subscribe((dateRelease: Date) => {
        if (dateRelease) {
          const newDate = new Date(dateRelease);
          newDate.setFullYear(newDate.getFullYear() + 1);
          this.productForm
            .get('date_revision')
            ?.setValue(this.datePipe.transform(newDate, 'yyyy-MM-dd', 'GMT-5'));
        } else {
          this.productForm.get('date_revision')?.reset();
        }
      });
  }

  save() {
    if (this.productForm.invalid) {
      return;
    }

    this.productForm.get('date_revision')?.enable();

    this.productService.saveProduct(this.productForm.value).subscribe((res) => {
      this.router.navigate(['/products']);
    });
  }
}
