import { TestBed } from '@angular/core/testing';

import { ToastrNotificationService } from './toastr.service';

describe('ToastrService', () => {
  let service: ToastrNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastrNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
