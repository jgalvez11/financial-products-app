import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [HeaderComponent, ModalComponent],
  imports: [CommonModule],
  exports: [HeaderComponent, ModalComponent],
})
export class SharedModule {}
