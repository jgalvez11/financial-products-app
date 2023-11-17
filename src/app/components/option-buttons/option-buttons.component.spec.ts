import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionButtonsComponent } from './option-buttons.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { EventEmitter } from '@angular/core';

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

  it('should emit searchEvent on search value change', () => {
    expect(component.searchEvent).toBeDefined();
    expect(component.searchEvent).toBeInstanceOf(EventEmitter);
  });

  it('should emit search term on search value change', () => {
    const searchTerm = 'example';
    component.search.subscribe((term) => {
      expect(term).toEqual(searchTerm);
    });
    component.filterValue.setValue(searchTerm);
  });
});
