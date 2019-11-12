import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IAuth } from '../model/auth';


@Injectable()
export class AuthService {

    planBasedURL = environment.apiUrl + '/auth';

    constructor(private http: HttpClient) {
    }

    signIn(auth: IAuth) {
        return this.http.post<void>(this.planBasedURL + '/signin', auth);
    }

}
