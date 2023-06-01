import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from 'src/app/models/client';

@Injectable({
	providedIn: 'root'
})
export class ClientService {
	private BASE_URL: string = 'http://localhost:8080/api/client';

	constructor(private http: HttpClient) {}

	getClients(): Observable<Client[]> {
		return this.http.get<Client[]>(`${this.BASE_URL}/get-clients`);
	}

	getBySharedKey(sharedKey: string): Observable<Client[]> {
		return this.http.get<Client[]>(`${this.BASE_URL}/get-client`, {
			params: new HttpParams().set('sharedKey', sharedKey)
		});
	}

	createClient(newClient: Client): Observable<Client> {
		return this.http.post<Client>(`${this.BASE_URL}/save`, newClient);
	}

	updateClient(client: Client): Observable<Client> {
		return this.http.put<Client>(`${this.BASE_URL}/update`, client);
	}
}
