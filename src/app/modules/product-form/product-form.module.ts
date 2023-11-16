import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ProductFormRoutingModule } from './product-form-routing.module';
import { ProductFormComponent } from 'src/app/components/product-form/product-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProductFormComponent],
  imports: [CommonModule, ProductFormRoutingModule, ReactiveFormsModule],
  providers: [DatePipe],
})
export class ProductFormModule {}
