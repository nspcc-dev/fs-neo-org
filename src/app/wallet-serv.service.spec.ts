import { TestBed } from '@angular/core/testing';

import { WalletServService } from './wallet-serv.service';

describe('WalletServService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WalletServService = TestBed.get(WalletServService);
    expect(service).toBeTruthy();
  });
});
