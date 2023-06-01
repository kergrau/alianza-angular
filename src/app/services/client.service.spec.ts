import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ClientService } from './client.service';
import { Client } from '../models/client';

describe('ClientService', () => {
  let service: ClientService;
  let client: Client

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('test method createClient ok', () => {
    service.createClient(client);
    expect(service).toBeTruthy();
  });

  it('test method updateClient ok', () => {
    service.updateClient(client);
    expect(service).toBeTruthy();
  });

  it('test method getBySharedKey ok', () => {
    service.getBySharedKey('test');
    expect(service).toBeTruthy();
  });

});
