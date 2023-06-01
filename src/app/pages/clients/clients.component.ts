import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Client } from 'src/app/models/client';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';
import { MessageService } from 'primeng/api';

@Component({
	selector: 'app-clients',
	templateUrl: './clients.component.html',
	styleUrls: ['./clients.component.scss'],
	providers: [MessageService]
})
export class ClientsComponent implements OnInit {
	sidebarVisible: boolean = false;
	items: MenuItem[] = [];
	showDialog: boolean = false;
	editing: boolean = false;
	loading: boolean = false;
	searchSharedKey: string = '';
	cols: any[] = [
		{ field: 'sharedKey', header: 'Shared Key' },
		{ field: 'businessId', header: 'Business ID' },
		{ field: 'email', header: 'E-mail' },
		{ field: 'phone', header: 'Phone' },
		{ field: 'dataAdded', header: 'Data Added' }
	];
	clients: Client[] = [];
	clientForm = this.fb.group({
		name: new FormControl('', [Validators.required]),
		lastname: new FormControl('', [Validators.required]),
		email: new FormControl('', [Validators.required, Validators.email]),
		phone: new FormControl(null, [Validators.required])
	});

	constructor(
		private fb: FormBuilder,
		private clientService: ClientService,
		private messageService: MessageService
	) {}

	ngOnInit(): void {
		this.getClients();
	}

	getClients(): void {
		this.clientService.getClients().subscribe({
			next: (result: Client[]) => {
				console.log('TODOS LOS CLIENTES', result);
				this.clients = result;
				this.loading = false;
			},
			error: (err) => {
				this.messageService.add({
					severity: 'error',
					summary: 'Error',
					detail: err.error
				});
			}
		});
	}

	submit(): void {
		let name = this.clientForm.get('name')?.value ?? '';
		let lastname = this.clientForm.get('lastname')?.value ?? '';
		let newClient: Client = {
			businessId: name + ' ' + lastname,
			email: this.clientForm.get('email')?.value ?? '',
			phone: this.clientForm.get('phone')?.value ?? 0
		};

		this.loading = true;
		this.clientService.createClient(newClient).subscribe({
			next: () => {
				this.handlerDialog();
				this.clientForm.reset();
				this.getClients();
				this.messageService.add({
					severity: 'success',
					summary: 'Success',
					detail: 'Saved Client Success'
				});
			},
			error: (err) => {
				this.loading = false;
				this.clientForm.reset();
				this.messageService.add({
					severity: 'error',
					summary: 'Error',
					detail: err.error
				});
			}
		});
	}

	findSharedKey(): void {
		this.clientService.getBySharedKey(this.searchSharedKey).subscribe({
			next: (result: Client[]) => {
				console.log('RESULTADO DE BUSQUEDA', result);
				this.clients = result;
			},
			error: (err) => {
				this.messageService.add({
					severity: 'error',
					summary: 'Error',
					detail: err.error
				});
			}
		});
	}

	handlerDialog(): void {
		this.showDialog = !this.showDialog;
	}

	updateClient(client: Client) {
		this.loading = true;
		this.clientService.updateClient(client).subscribe({
			next: () => {
				this.getClients();
			},
			error: (err) => {
				this.loading = false;
				this.messageService.add({
					severity: 'error',
					summary: 'Error',
					detail: err.error
				});
			}
		});
	}
}
