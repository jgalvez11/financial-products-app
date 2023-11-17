import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from './product-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TableComponent } from '../table/table.component';
import { PaginatorComponent } from '../paginator/paginator.component';
import { IProduct } from '../../models/interfaces/product';
import { EPaginator } from '../../models/enums/paginator.enum';
import { ApiService } from '../../services/api.service';
import { of } from 'rxjs';
import { IPaginator } from '../../models/interfaces/paginator.interface';
import { DropdownOptionComponent } from '../dropdown-option/dropdown-option.component';
import { OptionButtonsComponent } from '../option-buttons/option-buttons.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let mockProductService: Partial<ApiService>;

  beforeEach(() => {
    mockProductService = {
      getProducts: jest.fn().mockReturnValue(of([])),
    };

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      declarations: [
        ProductListComponent,
        TableComponent,
        PaginatorComponent,
        OptionButtonsComponent,
        DropdownOptionComponent,
      ],
      providers: [{ provide: ApiService, useValue: mockProductService }],
    });
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update products after fetching', () => {
    const mockProducts: IProduct[] = [
      {
        id: '1',
        name: 'Product 1',
        description: 'Description product 1',
        logo: 'logo 1',
        date_release: 'date release 1',
        date_revision: 'date revision 1',
      },
      {
        id: '2',
        name: 'Product 2',
        description: 'Description product 2',
        logo: 'logo 2',
        date_release: 'date release 2',
        date_revision: 'date revision 2',
      },
    ];

    (mockProductService.getProducts as jest.Mock).mockReturnValue(
      of(mockProducts)
    );

    component.ngOnInit();

    expect(mockProductService.getProducts).toHaveBeenCalled();
    expect(component.products).toEqual(mockProducts);
    expect(component.displayedProducts).toEqual(
      mockProducts.slice(0, component.itemsPerPage)
    );
  });

  it('should update displayed products when current page changes', () => {
    const newPage = 2;
    component.updateDisplayedProducts({
      key: EPaginator.CURRENT_PAGE,
      value: newPage,
    });

    const startIndex = (newPage - 1) * component.itemsPerPage;
    const endIndex = startIndex + component.itemsPerPage;

    expect(component.currentPage).toEqual(newPage);
    expect(component.displayedProducts).toEqual(
      component.products.slice(startIndex, endIndex)
    );
  });

  it('should update displayed products when items per page changes', () => {
    const mockProducts: IProduct[] = [
      {
        id: '1',
        name: 'Product 1',
        description: 'Description product 1',
        logo: 'logo 1',
        date_release: 'date release 1',
        date_revision: 'date revision 1',
      },
      {
        id: '2',
        name: 'Product 2',
        description: 'Description product 2',
        logo: 'logo 2',
        date_release: 'date release 2',
        date_revision: 'date revision 2',
      },
      {
        id: '3',
        name: 'Product 3',
        description: 'Description product 3',
        logo: 'logo 3',
        date_release: 'date release 3',
        date_revision: 'date revision 3',
      },
    ];

    component.products = mockProducts;

    const newItemsPerPage = 3;
    const mockPaginator: IPaginator = {
      key: EPaginator.ITEMS_PER_PAGE,
      value: newItemsPerPage,
    };

    component.updateDisplayedProducts(mockPaginator);

    expect(component.currentPage).toBe(1);
    expect(component.itemsPerPage).toBe(newItemsPerPage);

    const startIndex = (component.currentPage - 1) * component.itemsPerPage;
    const endIndex = startIndex + component.itemsPerPage;

    expect(component.displayedProducts).toEqual(
      mockProducts.slice(startIndex, endIndex)
    );

    expect(component.totalResults).toBe(mockProducts.length);
    expect(component.totalPages).toBe(
      Math.ceil(mockProducts.length / newItemsPerPage)
    );
  });
});
