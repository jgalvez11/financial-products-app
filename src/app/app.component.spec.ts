import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TableComponent } from './components/table/table.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { HeaderComponent } from './shared/header/header.component';
import { OptionButtonsComponent } from './components/option-buttons/option-buttons.component';
import { DropdownOptionComponent } from './components/dropdown-option/dropdown-option.component';

describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [
        AppComponent,
        ProductListComponent,
        TableComponent,
        PaginatorComponent,
        OptionButtonsComponent,
        DropdownOptionComponent,
        HeaderComponent,
      ],
    })
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
