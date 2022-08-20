import { TestBed } from '@angular/core/testing';

import { StockWsService } from './stock-ws.service';

describe('StockWsService', () => {
  let service: StockWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
