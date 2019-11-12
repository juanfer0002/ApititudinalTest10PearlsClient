import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/model/client';
import { ClientService } from 'src/app/services/client.service';
import { CLIENT_MSGS, DELETE_DIALOG_OPTS } from 'src/app/shared/constants/forms.constants';
import { Alert } from 'src/app/shared/utils/alert.utils';
import { Modal } from 'src/app/shared/utils/modal.utils';
import { SaveClientComponent } from './modal/save-client/save-client.component';

@Component({
    selector: 'app-clients',
    templateUrl: './clients.component.html'
})
export class ClientsComponent implements OnInit {

    clients: Client[] = [];

    constructor(
        private alert: Alert,
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

    async deleteClient(id: number) {
        const shouldDelete = await this.alert.showDialog(DELETE_DIALOG_OPTS).toPromise();
        if (shouldDelete) {

            await this.clientService.delete(id).toPromise();
            this.loadClients();

            this.alert.popSuccess(CLIENT_MSGS.DELETE_SUCCESS);
        }
    }

}
