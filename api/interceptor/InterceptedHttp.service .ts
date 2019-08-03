import { Observable } from 'rxjs';
import { Inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

export class InterceptedHttpService implements HttpInterceptor {
    constructor() {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      //  console.log(request);
        // if (!request || !request.url || (/^http/.test(request.url) && !(AppSettings.siteUrl && request.url.startsWith(AppSettings.siteUrl)))) {
        //     return next.handle(request);
        // }
        const token = localStorage.getItem('token');
        if (!!token) {
            request = request.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + token
                }
            });
        }
        return next.handle(request);
    }
}
