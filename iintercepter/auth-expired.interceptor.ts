
import { Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SharedService } from '../shared.service';
import { Responsecode } from '../../enums/responsecode.enum';

export class AuthExpiredInterceptor implements HttpInterceptor {
    constructor(private injector: Injector,private _sharedservice: SharedService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap(
                (event: HttpEvent<any>) => {},
                (err: any) => {
                    if (err instanceof HttpErrorResponse) {
                        if ((err.status === Responsecode.Forbidden)||(err.status === Responsecode.NotFound)||(err.status === 0)) {
                            
                            this._sharedservice.logout();
                        }
                    }
                }
            )
        );
    }
}
