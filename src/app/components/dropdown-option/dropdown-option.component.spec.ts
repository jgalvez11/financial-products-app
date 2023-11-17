import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownOptionComponent } from './dropdown-option.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ModalComponent } from '../../shared/modal/modal.component';

describe('DropdownOptionComponent', () => {
  let component: DropdownOptionComponent;
  let fixture: ComponentFixture<DropdownOptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownOptionComponent, ModalComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(DropdownOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize properties correctly', () => {
    expect(component.product).toBeUndefined();
    expect(component.modalConfirm).toBe(false);
    expect(component.modalError).toBe(false);
    expect(component.messageError).toBeUndefined();
  });

});
