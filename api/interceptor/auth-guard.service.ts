import { Injectable } from '@angular/core';
import {CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot,Router} from "@angular/router"
import {SharedService} from "../shared.service"
@Injectable()
export class AuthGuard implements CanActivate {

  _IsAuthenticated:boolean=true;

  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
      this._sharedservice.IsAuthenticated();
      return this._IsAuthenticated;
  }

   constructor(private _sharedservice:SharedService,private _router: Router) {
       this._sharedservice._IsAuthenticated.subscribe(value => this._IsAuthenticated = value);
   }

}
