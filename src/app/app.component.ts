import { Component } from '@angular/core';
import { TOKEN_KEY } from './shared/constants/auth.constants';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    isUserLogged = false;

    constructor(private router: Router) {
        // TODO: advance
        let token = sessionStorage.getItem(TOKEN_KEY);
        this.isUserLogged = !!token;

        if (this.isUserLogged) {
            this.router.navigate(['main']);
        }
    }


}
