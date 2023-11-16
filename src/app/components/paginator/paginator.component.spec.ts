import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { PaginatorComponent } from './paginator.component';
import { EPaginator } from '../../models/enums/paginator.enum';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [PaginatorComponent],
    });
    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go to a valid page', () => {
    const validPage = 2;
    const totalPages = 5;
    component.totalPages = totalPages;

    component.goToPage(validPage);

    expect(component.currentPage).toBe(validPage);
  });

  it('should not go to an invalid page', () => {
    const invalidPage = 10;
    const totalPages = 5;
    component.totalPages = totalPages;
    const initialPage = component.currentPage;

    component.goToPage(invalidPage);

    expect(component.currentPage).toBe(initialPage);
  });

  it('should change items per page', () => {
    const newItemsPerPage = 5;
    const event = { target: { value: newItemsPerPage.toString() } };

    component.changeItemsPerPage(event);

    expect(component.itemsPerPage).toBe(newItemsPerPage);
  });

  it('should emit updateDisplayedProducts event when changing page', () => {
    const page = 3;
    const totalPages = 5;
    component.totalPages = totalPages;
    const emittedValue = { key: EPaginator.CURRENT_PAGE, value: page };

    jest.spyOn(component.updateDisplayedProducts, 'emit');

    component.goToPage(page);

    expect(component.updateDisplayedProducts.emit).toHaveBeenCalledWith(
      emittedValue
    );
  });

  it('should emit updateDisplayedProducts event when changing items per page', () => {
    const newItemsPerPage = 10;
    const emittedValue = {
      key: EPaginator.ITEMS_PER_PAGE,
      value: newItemsPerPage,
    };
    const event = { target: { value: newItemsPerPage.toString() } };

    jest.spyOn(component.updateDisplayedProducts, 'emit');

    component.changeItemsPerPage(event);

    expect(component.updateDisplayedProducts.emit).toHaveBeenCalledWith(
      emittedValue
    );
  });
});
