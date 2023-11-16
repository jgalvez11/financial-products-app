import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { TableComponent } from 'src/app/components/table/table.component';
import { PaginatorComponent } from 'src/app/components/paginator/paginator.component';
import { ProductListComponent } from 'src/app/components/product-list/product-list.component';
import { OptionButtonsComponent } from 'src/app/components/option-buttons/option-buttons.component';
import { DropdownOptionComponent } from 'src/app/components/dropdown-option/dropdown-option.component';

@NgModule({
  declarations: [
    TableComponent,
    PaginatorComponent,
    ProductListComponent,
    OptionButtonsComponent,
    DropdownOptionComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ProductModule {}
