import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Representative } from '../model/representative';

@Injectable()
export class RepresentativeService {

    private baseUrl = environment.apiUrl + '/representatives';

    constructor(private http: HttpClient) { }

    getRepresentatives(): Observable<Representative[]> {
        return this.http.get<Representative[]>(this.baseUrl);
    }


}
