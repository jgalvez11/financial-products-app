import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownOptionComponent } from './dropdown-option.component';

describe('DropdownOptionComponent', () => {
  let component: DropdownOptionComponent;
  let fixture: ComponentFixture<DropdownOptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownOptionComponent]
    });
    fixture = TestBed.createComponent(DropdownOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
