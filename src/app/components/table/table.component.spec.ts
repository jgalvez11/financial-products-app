import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';

const mockProducts = [
  {
    id: '123',
    name: 'Tarjeta GOLD',
    description: 'tarjeta de membresía GOLD',
    logo: 'logo',
    date_release: '2023/11/17',
    date_revision: '2024/11/17',
  },
  {
    id: '1234',
    name: 'Tarjeta GOLD',
    description: 'tarjeta de membresía GOLD',
    logo: 'logo',
    date_release: '2023/11/17',
    date_revision: '2024/11/17',
  },
  {
    id: '12345',
    name: 'Tarjeta GOLD',
    description: 'tarjeta de membresía GOLD',
    logo: 'logo',
    date_release: '2023/11/17',
    date_revision: '2024/11/17',
  },
];

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableComponent],
    });
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove an item from displayedProducts', () => {
    component.displayedProducts = [...mockProducts];

    component.removeItem('1234');

    expect(component.displayedProducts.length).toBe(2);
    expect(
      component.displayedProducts.map((product) => product.id)
    ).not.toContain('1234');
  });

  it('should not remove any item if id does not exist', () => {
    component.displayedProducts = [...mockProducts];
    console.log(component.displayedProducts);

    component.removeItem('123456');

    expect(component.displayedProducts.length).toBe(3);
  });
});
