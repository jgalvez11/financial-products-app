import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductFormComponent } from '../../components/product-form/product-form.component';

const routes: Routes = [
  {
    path: '',
    component: ProductFormComponent,
  },
  {
    path: ':id',
    component: ProductFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductFormRoutingModule {}
