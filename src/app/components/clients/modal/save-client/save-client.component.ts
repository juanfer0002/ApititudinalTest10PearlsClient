import { Component, OnInit, Input } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Client } from 'src/app/model/client';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FORM_ERROR_MSGS, CLIENT_MSGS, PHONE_PATTERN, INTEGER_PATTERN, NUMBER_PATTERN } from 'src/app/shared/constants/forms.constants';
import { MDBModalRef } from 'angular-bootstrap-md';
import { ClientService } from 'src/app/services/clients.service';
import { Alert } from 'src/app/shared/utils/alert.utils';
import { City } from 'src/app/model/city';
import { CitySelectorComponent } from 'src/app/components/city-selector/city-selector.component';
import { Modal } from 'src/app/shared/utils/modal.utils';


@Component({
    selector: 'app-save-client',
    templateUrl: './save-client.component.html'
})
export class SaveClientComponent implements OnInit {

    action: Subject<boolean> = new Subject();

    formErrorMsgs = FORM_ERROR_MSGS;
    contactInfoMsgs = CLIENT_MSGS;

    submitted = false;
    clientForm: FormGroup;

    @Input() // Populated by MD Modal
    client: Client;

    constructor(
        public modalRef: MDBModalRef,
        public modal: Modal,
        private alert: Alert,
        private clientService: ClientService,
    ) { }

    ngOnInit() {
        this.clientForm = new FormGroup({
            id: new FormControl(''),
            nit: new FormControl('', [Validators.required, Validators.maxLength(20)]),
            name: new FormControl('', [Validators.required, Validators.maxLength(200)]),
            phone: new FormControl('', [
                Validators.required, Validators.pattern(PHONE_PATTERN), Validators.maxLength(20)
            ]),
            cityDTO: new FormControl(''),
            cityName: new FormControl('', [Validators.required]),
            address: new FormControl('', [Validators.required, Validators.maxLength(200)]),
            maximumAmount: new FormControl('', [
                Validators.required, Validators.pattern(NUMBER_PATTERN)
            ]),
        });

        this.client && this.clientForm.patchValue(this.client);
    }

    ngOnDestroy() {
        this.action.unsubscribe();
    }

    get fields() {
        return this.clientForm.controls;
    }

    close(result: boolean = false) {
        this.modalRef.hide();
        !!result && this.action.next(result);
        this.action.complete();
    }

    openCitySelector(): Observable<City> {
        const openModal = this.modal.show(CitySelectorComponent);
        return openModal.content.action;
    }

    async selectCity() {
        const city = await this.openCitySelector().toPromise();

        if (city) {
            this.fields.cityDTO.setValue(city);
            this.fields.cityName.setValue(city.name);
        }
    }

    async saveClient() {

        this.submitted = true;
        this.clientForm.markAllAsTouched();

        if (this.clientForm.valid) {
            const client: Client = this.clientForm.value;
            await this.clientService.save(client).toPromise();

            this.alert.popSuccess(this.contactInfoMsgs.SUCCESS);
            this.close(true);
        } else {
            this.alert.popWarn(this.formErrorMsgs.FORM_ERRORS);
        }
    }

}
