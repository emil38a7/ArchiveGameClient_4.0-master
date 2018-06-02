import { TestBed, inject } from '@angular/core/testing';

import { NavMenuServiceService } from './nav-menu-service.service';

describe('NavMenuServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavMenuServiceService]
    });
  });

  it('should be created', inject([NavMenuServiceService], (service: NavMenuServiceService) => {
    expect(service).toBeTruthy();
  }));
});
