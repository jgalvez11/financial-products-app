import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { IProduct } from '../models/interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.services.product;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.apiUrl);
  }
}
