import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { ClientService } from 'src/app/services/client.service';
import { ClientsComponent } from './clients.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { Client } from 'src/app/models/client';

describe('ClientsComponent', () => {
  let component: ClientsComponent;
  let fixture: ComponentFixture<ClientsComponent>;
  let client: Client;
  let clients: Client[] = [
		{
			id: 0,
			sharedKey: 'pruebaKer',
			businessId: 'prueba kerley',
			email: 'prueba@gmail.com',
			phone: 32222222,
			dataAdded: new Date()
		},
		{
			id: 1,
			sharedKey: 'pruebaManuel',
			businessId: 'prueba manuel',
			email: 'manuel@gmail.com',
			phone: 30000000,
			dataAdded: new Date()
		}
	];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientsComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ToastModule,
        TooltipModule,
        TableModule,
        CardModule,
        DialogModule,
        InputTextModule,
        ButtonModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        ClientService
      ]
    });
    fixture = TestBed.createComponent(ClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const service = fixture.debugElement.injector.get(ClientService);
    spyOn(service, 'getClients').and.returnValues(of(clients));
    expect(component.clients.length).toEqual(0);
  });

  it('test method getClients ok', () => {
    const service = fixture.debugElement.injector.get(ClientService);
    spyOn(service, 'getClients').and.returnValues(of(clients));
    component.getClients();
    expect(component.clients.length).toEqual(2);
  });

  it('test method getClients failed', () => {
    const service = fixture.debugElement.injector.get(ClientService);
    spyOn(service, 'getClients').and.returnValues(throwError(() => new Error()));
    component.getClients();
    expect(component.clients.length).toEqual(0);
  });

  it('test method submit ok', () => {
    const service = fixture.debugElement.injector.get(ClientService);
    spyOn(service, 'createClient').and.returnValues(of(client));
    component.submit();
    expect(component.loading).toEqual(true);
  });

  it('test method submit with information empty', () => {
    let name = component.clientForm.controls['name'];
    let lastname = component.clientForm.controls['lastname'];
    let email =  component.clientForm.controls['email'];
    name.setValue(null);
    lastname.setValue(null);
    email.setValue(null);
    const service = fixture.debugElement.injector.get(ClientService);
    spyOn(service, 'createClient').and.returnValues(of(client));
    component.submit();
    expect(component.loading).toEqual(true);
  });

  it('test method submit failed', () => {
    const service = fixture.debugElement.injector.get(ClientService);
    spyOn(service, 'createClient').and.returnValues(throwError(() => new Error()));
    component.submit();
    expect(component.loading).toEqual(false);
  });

  it('test method updateClient ok', () => {
    const service = fixture.debugElement.injector.get(ClientService);
    spyOn(service, 'updateClient').and.returnValues(of(client));
    component.updateClient(client);
    expect(component.loading).toEqual(true);
  });

  it('test method updateClient failed', () => {
    const service = fixture.debugElement.injector.get(ClientService);
    spyOn(service, 'updateClient').and.returnValues(throwError(() => new Error()));
    component.updateClient(client);
    expect(component.loading).toEqual(false);
  });

  it('test method findSharedKey ok', () => {
    const service = fixture.debugElement.injector.get(ClientService);
    spyOn(service, 'getBySharedKey').and.returnValues(of(clients));
    component.findSharedKey();
    expect(component.clients.length).toEqual(2);
  });

  it('test method findSharedKey failed', () => {
    const service = fixture.debugElement.injector.get(ClientService);
    spyOn(service, 'getBySharedKey').and.returnValues(throwError(() => new Error()));
    component.findSharedKey();
    expect(component.clients.length).toEqual(0);
  });
});
