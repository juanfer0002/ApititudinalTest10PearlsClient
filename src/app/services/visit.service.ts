import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Visit } from '../model/visit';


@Injectable()
export class VisitService {

    private baseUrl = environment.apiUrl + '/visits';

    constructor(private http: HttpClient) { }

    save(visit: Visit): Observable<Visit> {
        return this.http.post<Visit>(this.baseUrl, visit);
    }

    delete(visitId: number): Observable<void> {
        return this.http.delete<void>(this.baseUrl + '/' + visitId);
    }

}
