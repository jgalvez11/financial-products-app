import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { ApiInterceptor } from './api.interceptor';
import { Observable } from 'rxjs';

describe('ApiInterceptor', () => {
  let interceptor: ApiInterceptor;

  beforeEach(() => {
    interceptor = new ApiInterceptor();
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should intercept and set authorId header', () => {
    const mockRequest = new HttpRequest('GET', '/api');
    const mockHandler: HttpHandler = {
      handle: (request: HttpRequest<any>) => {
        expect(request.headers.get('authorId')).toBe('10');
        return new Observable<HttpEvent<any>>();
      },
    };

    const intercepted = interceptor.intercept(mockRequest, mockHandler);
    intercepted.subscribe();
  });
});
