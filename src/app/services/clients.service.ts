import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../model/client';

@Injectable()
export class ClientService {

    private baseUrl = environment.apiUrl + '/clients';

    constructor(private http: HttpClient) { }

    getAll(): Observable<Client[]> {
        return this.http.get<Client[]>(this.baseUrl);
    }

    save(client: Client): Observable<Client> {
        return this.http.post<Client>(this.baseUrl, client);
    }

    delete(clientId: number): Observable<void> {
        return this.http.get<void>(this.baseUrl + '/' + clientId);
    }

}
