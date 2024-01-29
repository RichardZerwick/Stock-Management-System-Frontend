import { TestBed } from '@angular/core/testing';

import { ProductsEventsService } from './products-events.service';

describe('ProductsEventsService', () => {
  let service: ProductsEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
