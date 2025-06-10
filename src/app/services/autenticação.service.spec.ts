import { TestBed } from '@angular/core/testing';

import { AutenticaçãoService } from './autenticação.service';

describe('AutenticaçãoService', () => {
  let service: AutenticaçãoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutenticaçãoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
