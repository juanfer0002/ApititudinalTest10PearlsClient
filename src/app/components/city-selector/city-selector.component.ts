import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import { Alert } from 'src/app/shared/utils/alert.utils';
import { FORM_ERROR_MSGS } from 'src/app/shared/constants/forms.constants';
import { City } from 'src/app/model/city';
import { Country } from 'src/app/model/country';
import { Department } from 'src/app/model/department';
import { CountryService } from 'src/app/services/country.service';
import { DepartmentService } from 'src/app/services/department.service';


@Component({
    selector: 'app-city-selector',
    templateUrl: './city-selector.component.html'
})
export class CitySelectorComponent implements OnInit, OnDestroy {

    formErrorMsgs = FORM_ERROR_MSGS;

    cityForm: FormGroup;
    action: Subject<City> = new Subject();

    countries: Country[];
    departments: Department[];
    cities: City[];

    submitted = false;

    constructor(
        private formBuild: FormBuilder,
        private countryService: CountryService,
        private departmentService: DepartmentService,
        public modalRef: MDBModalRef,
        private alert: Alert
    ) { }

    ngOnInit() {
        this.loadCountries();

        this.cityForm = this.formBuild.group({
            country: [null, Validators.required],
            department: [null, Validators.required],
            city: [null, Validators.required],
        });
    }

    async loadCountries() {
        this.countries = await this.countryService.getCountries().toPromise();
    }

    async loadDepartments(countryId: number) {
        this.departments = await this.countryService.getCountryDepartments(countryId).toPromise();
    }

    async loadCities(departmentId: number) {
        this.cities = await this.departmentService.getDepartmentCities(departmentId).toPromise();
    }

    onChangeCountry() {
        const selectedCountry: Country = this.cityForm.controls.country.value;
        selectedCountry && this.loadDepartments(selectedCountry.id);

        this.cityForm.controls.department.setValue(null);
        this.cityForm.controls.city.setValue(null);
    }

    onChangeDepartment() {
        const selectedDepartment: Department = this.cityForm.controls.department.value;
        selectedDepartment && this.loadCities(selectedDepartment.id);
        this.cityForm.controls.city.setValue(null);
    }

    ngOnDestroy() {
        this.action.unsubscribe();
    }

    get fields() {
        return this.cityForm.controls;
    }

    close(result?: City) {
        this.modalRef.hide();
        !!result && this.action.next(result);
        this.action.complete();
    }

    async setCity() {

        this.submitted = true;
        this.cityForm.markAllAsTouched();

        if (this.cityForm.valid) {
            const formValue = this.cityForm.value;
            this.close(formValue.city);
        } else {
            this.alert.popWarn(FORM_ERROR_MSGS.FORM_ERRORS);
        }

    }

}
