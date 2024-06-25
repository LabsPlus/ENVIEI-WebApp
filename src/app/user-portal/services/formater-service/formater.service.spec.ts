import { TestBed } from '@angular/core/testing';

import { FormaterService } from './formater.service';

describe('FormaterService', () => {
  let service: FormaterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormaterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
