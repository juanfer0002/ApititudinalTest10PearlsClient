import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/model/client';
import { ClientService } from 'src/app/services/clients.service';
import { Modal } from 'src/app/shared/utils/modal.utils';
import { SaveClientComponent } from './modal/save-client/save-client.component';

@Component({
    selector: 'app-clients',
    templateUrl: './clients.component.html'
})
export class ClientsComponent implements OnInit {

    clients: Client[] = [];

    constructor(
        private modal: Modal,
        private clientService: ClientService
    ) { }

    ngOnInit() {
        this.loadClients();
    }

    async loadClients() {
        this.clients = await this.clientService.getAll().toPromise();
    }

    openSaveModal(client?: Client) {
        const modalOpts = { data: { client } };
        const openModal = this.modal.show(SaveClientComponent, modalOpts);

        openModal.content.action.subscribe(async (saved: boolean) => {
            saved && await this.loadClients();
        });
    }

}
