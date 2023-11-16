import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment.development';
import { IProduct } from '../models/interfaces/product';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve products via GET', () => {
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

    service.getProducts().subscribe((products: IProduct[]) => {
      expect(products).toEqual(mockProducts);
    });

    const mockUrl = environment.services.product;
    const req = httpTestingController.expectOne(mockUrl);

    expect(req.request.method).toEqual('GET');

    req.flush(mockProducts);
  });
});
