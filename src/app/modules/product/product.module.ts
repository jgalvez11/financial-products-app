import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ProductRoutingModule } from './product-routing.module';
import { TableComponent } from '../../components/table/table.component';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { OptionButtonsComponent } from '../../components/option-buttons/option-buttons.component';
import { DropdownOptionComponent } from '../../components/dropdown-option/dropdown-option.component';

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
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class ProductModule {}
