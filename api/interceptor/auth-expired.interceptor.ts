/*
 * Copyright (c) 2018.
 * ************************************************************************
 *
 *  CASHAA HOLDING OU
 *  __________________
 *
 *   [2018] CASHAA HOLDING OU
 *   All Rights Reserved.
 *
 *  NOTICE:  All information contained herein is, and remains the property of CASHAA HOLDING OU and its suppliers, if any.  The intellectual and technical concepts contained herein are proprietary to CASHAA HOLDING OU and its suppliers and are protected by trade secret or copyright law. Dissemination of this information or reproduction of this material is strictly forbidden unless
 *    prior written permission is obtained from CASHAA HOLDING OU.
 *
 */

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
