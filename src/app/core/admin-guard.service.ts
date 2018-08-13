import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AdminGuard implements CanActivate {
    private role: String = '';
    private isAd: Boolean = false;
    constructor(private _auth: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = localStorage.getItem('currentUser');
        this.role = this._auth.getRole();
        if (this.role.indexOf('Admin') !== -1) {
        this.isAd = true;
        }
        if (this.isAd) {
            return true;
        }
        return false;
    }
}
