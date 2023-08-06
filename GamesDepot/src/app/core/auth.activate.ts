import { Injectable, OnInit } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../user/auth.service';

@Injectable({ providedIn: 'root' })

export class AuthActivate implements CanActivate{

  constructor(private authService: AuthService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
        return this.isLogedin()
    }

    isLogedin(): any {
      if (!!localStorage.getItem('userId')) {
        this.authService.isThisUserExisting(localStorage.getItem('userId')).then(res =>  {
          if(res){
            return true
          } else {
            return false
          }
        })
        
      } else {
        
        return false
      }
    }

}