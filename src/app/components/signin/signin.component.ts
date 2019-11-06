import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TOKEN_KEY } from 'src/app/shared/constants/auth.constants';
import { FORM_ERROR_MSGS, SIGNIN_MSGS } from 'src/app/shared/constants/forms.constants';
import { IAuth } from 'src/app/shared/model/auth';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Alert } from 'src/app/shared/utils/alert.utils';
import { Router } from '@angular/router';


FormGroup

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

    formErrorMsgs = FORM_ERROR_MSGS;
    signinMsgs = SIGNIN_MSGS;

    submitted = false;
    signinForm: FormGroup;

    constructor(
        private alert: Alert,
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
        this.signinForm = new FormGroup({
            username: new FormControl('', [Validators.required, Validators.maxLength(200)]),
            password: new FormControl('', [Validators.required, Validators.maxLength(200)])
        });
    }

    get fields() {
        return this.signinForm.controls;
    }

    async signIn() {
        this.submitted = true;
        this.signinForm.markAllAsTouched();

        if (this.signinForm.valid) {

            const auth: IAuth = this.signinForm.value;
            await this.authService.signIn(auth).toPromise();
            sessionStorage.setItem(TOKEN_KEY, 'token');
            this.router.navigate(['main']);

            this.alert.popSuccess(this.signinMsgs.SUCCESS);

        } else {
            this.alert.popWarn(this.formErrorMsgs.FORM_ERRORS);
        }

    }
}
