import { Component, OnInit } from '@angular/core';
import { Alert } from 'src/app/shared/utils/alert.utils';
import { Modal } from 'src/app/shared/utils/modal.utils';
import { Visit } from 'src/app/model/visit';
import { ActivatedRoute, Router } from '@angular/router';
import { VisitService } from 'src/app/services/visit.service';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/model/client';
import { SaveVisitComponent } from './modal/save-visit/save-visit.component';
import { DELETE_DIALOG_OPTS, CLIENT_MSGS } from 'src/app/shared/constants/forms.constants';

@Component({
    selector: 'app-visits-component',
    templateUrl: './visits-component.component.html'
})
export class VisitsComponentComponent implements OnInit {

    clientId: number;
    client: Client;
    visits: Visit[] = [];


    constructor(
        private alert: Alert,
        private modal: Modal,
        private clientService: ClientService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.clientId = +this.route.snapshot.paramMap.get('id');

        if (this.clientId) {
            this.loadClient();
            this.loadVisits();
        } else {
            this.goBackToClients();
        }
    }


    async loadClient() {
        this.client = await this.clientService.getById(this.clientId).toPromise();
        !this.client && this.goBackToClients();
    }

    goBackToClients() {
        this.alert.popError('Client is not valid');
        this.router.navigate(['clients']);

    }

    async loadVisits() {
        this.visits = await this.clientService.getClientVisits(this.clientId).toPromise();
    }

    openSaveModal() {
        const modalOpts = { data: { client: this.client } };
        const openModal = this.modal.show(SaveVisitComponent, modalOpts);

        openModal.content.action.subscribe(async (saved: boolean) => {
            saved && await this.loadVisits();
        });
    }

    async deleteVisit(id: number) {
        const shouldDelete = await this.alert.showDialog(DELETE_DIALOG_OPTS).toPromise();
        if (shouldDelete) {

            await this.clientService.delete(id).toPromise();
            this.loadVisits();

            this.alert.popSuccess(CLIENT_MSGS.DELETE_SUCCESS);
        }
    }

}
