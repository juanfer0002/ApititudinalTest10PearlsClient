import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { Alert } from '../utils/alert.utils';
import { LoadingScreen } from '../utils/loading-screen.utils';



@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    activeRequests: number = 0;

    constructor(
        private alert: Alert,
        private loadingScreen: LoadingScreen
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.activateLoadingScreen();

        request = this.addContentTypeToRequest(request);
        request = this.addAcceptToRequest(request);

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => event),
            catchError((error: HttpErrorResponse) => this.handleError(error)),
            finalize(this.deactivateLoadingScreen.bind(this))
        );
    }

    activateLoadingScreen() {
        if (this.activeRequests === 0) {
            this.loadingScreen.startLoading();
        }

        this.activeRequests++;
    }

    deactivateLoadingScreen() {
        this.activeRequests--;

        if (this.activeRequests === 0) {
            this.loadingScreen.stopLoading();
        }
    }

    addContentTypeToRequest(request: HttpRequest<any>) {
        return !request.headers.has('Content-Type')
            ? request.clone({ headers: request.headers.set('Content-Type', 'application/json') })
            : request;
    }

    addAcceptToRequest(request: HttpRequest<any>) {
        return request.clone({ headers: request.headers.set('Accept', 'application/json') });
    }

    handleError(error: HttpErrorResponse) {
        let status = error.status;

        switch (status) {
            case 401:
                this.alert.popError('Email or password wrong.');
                break;

            case 409:
                const serverMsg = error.error;
                this.alert.popError(serverMsg);
                break;

            default:
                this.alert.popError('Sorry, An internal error has occurred.');
                break;
        }

        return throwError(error);
    }

}