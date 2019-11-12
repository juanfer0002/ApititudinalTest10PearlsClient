import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { City } from '../model/city';


@Injectable()
export class DepartmentService {

    private baseUrl = environment.apiUrl + '/departments';

    constructor(private http: HttpClient) { }

    getDepartmentCities(departmentId: number): Observable<City[]> {
        return this.http.get<City[]>(this.baseUrl + '/' + departmentId + '/cities');
    }
}
