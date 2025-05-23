import { TestBed } from '@angular/core/testing';

import { MercadoLivreService } from './mercado-livre.service';

describe('MercadoLivreService', () => {
  let service: MercadoLivreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MercadoLivreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
