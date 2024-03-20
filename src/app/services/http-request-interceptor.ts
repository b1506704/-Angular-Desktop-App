import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParameterCodec, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoadingService } from './loading.service';

/**
 * This class is for intercepting http requests. When a request starts, we set the loadingSub property
 * in the LoadingService to true. Once the request completes and we have a response, set the loadingSub
 * property to false. If an error occurs while servicing the request, set the loadingSub property to false.
 */
@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

    constructor(
        private loading: LoadingService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loading.setLoading(true, request.url);

        if (request.method === 'GET') {
            const time = new Date().getTime();
            const keys = request.params.keys();

            let newParams: HttpParams = new HttpParams({ encoder: new URIComponentCodec() });
            if (request.params && request.params.keys().length > 0) {
                keys.forEach(item => {
                    const value = request.params.get(item);
                    if (value) {
                        newParams = newParams.append(item, value);
                    }
                });
            }

            newParams = newParams.append('version', time.toString());
            request = request.clone({ params: newParams });
        }

        return next.handle(request).pipe(
            map(evt => {
                if (evt instanceof HttpResponse) {
                    this.loading.setLoading(false, request.url);
                }

                return evt;
            }),
            catchError(err => {
                this.loading.setLoading(false, request.url);
                throw err;
            })
        );

        // throw new HttpErrorResponse({ status: 404, statusText: 'Not found', url: request.url });
    }
}

class URIComponentCodec implements HttpParameterCodec {
    encodeKey(key: string): string {
        return encodeURIComponent(key);
    }
    encodeValue(value: string): string {
        return encodeURIComponent(value);
    }
    decodeKey(key: string): string {
        return decodeURIComponent(key);
    }
    decodeValue(value: string): string {
        return decodeURIComponent(value);
    }
}
