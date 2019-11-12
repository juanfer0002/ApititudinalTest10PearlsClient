import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country } from '../model/country';
import { Department } from '../model/department';

@Injectable()
export class CountryService {

    private baseUrl = environment.apiUrl + '/countries';

    constructor(private http: HttpClient) { }

    getCountries(): Observable<Country[]> {
        return this.http.get<Country[]>(this.baseUrl);
    }

    getCountryDepartments(countryId: number): Observable<Department[]> {
        return this.http.get<Department[]>(this.baseUrl + '/' + countryId + '/departments');
    }

}
