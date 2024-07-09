import { TestBed } from '@angular/core/testing';
import { CpfValidatorService } from './cpf-validator.service';

describe('CpfValidatorService', () => {
  let service: CpfValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CpfValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
