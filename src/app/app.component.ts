import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    public progress = this.loading.getPercent();

    private subscription = new Subscription();

    constructor(
        private loading: LoadingService
    ) { }

    ngOnInit() {
        this.loading.loadingSub.subscribe((isLoading: boolean) => {
            if (isLoading) {
                this.loading.start();
            } else {
                this.loading.complete();
            }
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
