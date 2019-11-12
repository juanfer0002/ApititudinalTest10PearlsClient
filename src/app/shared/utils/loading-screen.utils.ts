import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class LoadingScreen {

    private loadingValue = false;
    loadingStatus: Subject<any> = new Subject();

    get loading(): boolean {
        return this.loadingValue;
    }

    set loading(value) {
        this.loadingValue = value;
        this.loadingStatus.next(value);
    }

    startLoading() {
        this.loading = true;
    }

    stopLoading() {
        this.loading = false;
    }
}
