import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFormComponent } from './product-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DatePipe } from '@angular/common';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from '../../services/api.service';
import { of } from 'rxjs';
import { ConvertDateService } from '../../services/utils/convert-date.service';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let productService: ApiService;
  let convertDateService: ConvertDateService;
  let fixture: ComponentFixture<ProductFormComponent>;

  const mockProduct = {
    id: 'mockId',
    name: 'Tarjeta GOLD',
    description: 'tarjeta de membresía GOLD',
    logo: 'logo',
    date_release: '2023/11/17',
    date_revision: '2024/11/17',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductFormComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      providers: [DatePipe, ApiService, ConvertDateService],
    });
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ApiService);
    convertDateService = TestBed.inject(ConvertDateService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate ID availability', () => {
    const mockIdControl: AbstractControl<any> =
      component.productForm.get('id')!;

    jest.spyOn(productService, 'checkAvailability').mockReturnValue(of(true));

    const validationObservable = component.checkIdAvailability()(mockIdControl);

    expect(validationObservable).toBeTruthy();
  });

  it('should update product if productId exists', () => {
    component.productForm.setValue(mockProduct);

    component.productId = 'mockId';
    jest.spyOn(component.productForm, 'invalid', 'get').mockReturnValue(false);

    const updateProductSpy = jest
      .spyOn(productService, 'updateProduct')
      .mockReturnValue(of());

    component.save();

    expect(updateProductSpy).toHaveBeenCalledWith(mockProduct);
  });

  it('should save product if productId does not exist', () => {
    component.productForm.setValue(mockProduct);

    component.productId = null;

    jest.spyOn(component.productForm, 'invalid', 'get').mockReturnValue(false);
    const saveProductSpy = jest
      .spyOn(productService, 'saveProduct')
      .mockReturnValue(of());

    component.save();

    expect(saveProductSpy).toHaveBeenCalledWith(mockProduct);
  });

  it('should reset form correctly when productId exists', () => {
    const mockProductId = 'mockId';
    const mockIdValue = 'mockIdValue';

    component.productId = mockProductId;
    component.productForm.get('id')?.setValue(mockIdValue);
    component.resetForm();

    expect(component.productForm.value).toEqual({
      id: mockIdValue,
      name: null,
      description: null,
      logo: null,
      date_release: null,
    });

    expect(component.productForm.get('id')?.value).toEqual(mockIdValue);
  });

  it('should reset form correctly when productId does not exist', () => {
    component.productId = null;
    component.productForm.get('id')?.setValue('mockIdValue');

    component.resetForm();

    expect(component.productForm.value).toEqual({
      id: null,
      name: null,
      description: null,
      logo: null,
      date_release: null,
    });

    expect(component.productForm.get('id')?.value).toBeNull();
  });
});
