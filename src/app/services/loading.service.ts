import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    public loadingSub: Subject<boolean> = new Subject<boolean>();
    // contains map of url and loading state as boolean true or false
    public loadingMap: Map<string, boolean> = new Map<string, boolean>();

    public progress = 0;

    private fullWidth = 100;
    private runProgress: any;
    private subject: Subject<number> = new Subject<number>();

    constructor() {
    }

    public setLoading(loading: boolean, url: string): void {
        if (!url) {
            throw new Error('Request URL is not provided to set the loading status.');
        }

        if (loading === true) {
            this.loadingMap.set(url, true);
            this.loadingSub.next(true);
        } else if (loading === false && this.loadingMap.has(url)) {
            this.loadingMap.delete(url);
        }

        if (this.loadingMap.size === 0) {
            this.loadingSub.next(false);
        }
    }

    private onProgress() {
        this.progress++;

        if (this.progress > this.fullWidth) {
            this.progress = 0;
            clearInterval(this.runProgress);
        }

        this.subject.next(this.progress);
    }

    public start() {
        if (this.runProgress) {
            clearInterval(this.runProgress);
        }

        this.runProgress = setInterval(() => this.onProgress(), 100);
    }

    public complete() {
        if (this.progress > 0 && this.progress < this.fullWidth) {
            this.progress = this.fullWidth - 5;
        } else {
            this.progress = 0;
            clearInterval(this.runProgress);
        }

        this.subject.next(this.progress);
    }

    public getPercent(): Observable<number> {
        return this.subject.asObservable();
    }
}
