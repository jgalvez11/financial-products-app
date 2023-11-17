import { TestBed } from '@angular/core/testing';

import { ConvertDateService } from './convert-date.service';
import { DatePipe } from '@angular/common';

describe('ConvertDateService', () => {
  let service: ConvertDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatePipe]
    });
    service = TestBed.inject(ConvertDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
