import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import { Visit } from 'src/app/model/visit';
import { VisitService } from 'src/app/services/visit.service';
import { FORM_ERROR_MSGS, VISIT_MSGS, NUMBER_PATTERN } from 'src/app/shared/constants/forms.constants';
import { Alert } from 'src/app/shared/utils/alert.utils';
import { Modal } from 'src/app/shared/utils/modal.utils';
import { Representative } from 'src/app/model/representative';
import { RepresentativeService } from 'src/app/services/representative.service';
import { Client } from 'src/app/model/client';

import * as moment from 'moment';

@Component({
    selector: 'app-save-visit',
    templateUrl: './save-visit.component.html'
})
export class SaveVisitComponent implements OnInit, OnDestroy {

    action: Subject<boolean> = new Subject();

    formErrorMsgs = FORM_ERROR_MSGS;
    visitMsgs = VISIT_MSGS;

    submitted = false;
    visitForm: FormGroup;

    @Input() // Populated by MD Modal
    visit: Visit;

    @Input()
    client: Client;

    representatives: Representative[] = [];

    constructor(
        public modalRef: MDBModalRef,
        public modal: Modal,
        private alert: Alert,
        private representativeService: RepresentativeService,
        private visitService: VisitService,
    ) { }

    ngOnInit() {
        this.loadRepresentatives();

        const date = moment().format('YYYY-MM-DD');

        this.visitForm = new FormGroup({
            id: new FormControl(''),
            date: new FormControl(date, [Validators.required]),
            representativeDTO: new FormControl('', [Validators.required]),
            net: new FormControl('', [Validators.required, Validators.pattern(NUMBER_PATTERN)]),
            total: new FormControl(''),
        });

        this.visit && this.visitForm.patchValue(this.visit);
    }

    async loadRepresentatives() {
        this.representatives = await this.representativeService.getRepresentatives().toPromise();
    }

    ngOnDestroy() {
        this.action.unsubscribe();
    }

    get fields() {
        return this.visitForm.controls;
    }

    close(result: boolean = false) {
        this.modalRef.hide();
        !!result && this.action.next(result);
        this.action.complete();
    }

    onChangeNet() {
        const currentNet: number = this.fields.net.value;
        const total = currentNet * this.client.visitsPercenage;
        this.fields.total.setValue(total);
    }

    async saveVisit() {

        this.submitted = true;
        this.visitForm.markAllAsTouched();

        if (this.visitForm.valid) {
            const visit: Visit = this.visitForm.value;
            visit.clientDTO = this.client;

            await this.visitService.save(visit).toPromise();

            this.alert.popSuccess(this.visitMsgs.SAVE_SUCESS);
            this.close(true);
        } else {
            this.alert.popWarn(this.formErrorMsgs.FORM_ERRORS);
        }
    }

}
