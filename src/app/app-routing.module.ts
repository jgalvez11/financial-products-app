import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'products',
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./modules/product/product.module').then((m) => m.ProductModule),
  },
  {
    path: 'form',
    loadChildren: () =>
      import('./modules/product-form/product-form.module').then(
        (m) => m.ProductFormModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
