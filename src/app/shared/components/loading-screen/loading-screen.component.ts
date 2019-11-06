import { Component, OnDestroy, OnInit, } from '@angular/core';

import { Subscription } from "rxjs";

import { LoadingScreen } from '../../utils/loading-screen.utils';
import { debounceTime } from "rxjs/operators";

@Component({
    selector: 'app-loading-screen',
    templateUrl: './loading-screen.component.html',
    styleUrls: ['./loading-screen.component.scss']
})
export class LoadingScreenComponent implements OnInit, OnDestroy {

    loading: boolean = false;
    loadingSubscription: Subscription;

    constructor(private LoadingScreen: LoadingScreen) {
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        this.loadingSubscription = this.LoadingScreen.loadingStatus.pipe(
            debounceTime(200)
        ).subscribe((value) => {
            this.loading = value;
        });
    }

    ngOnDestroy() {
        this.loadingSubscription.unsubscribe();
    }

}