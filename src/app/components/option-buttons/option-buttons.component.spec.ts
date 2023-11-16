import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionButtonsComponent } from './option-buttons.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('OptionButtonsComponent', () => {
  let component: OptionButtonsComponent;
  let fixture: ComponentFixture<OptionButtonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OptionButtonsComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
    });
    fixture = TestBed.createComponent(OptionButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
