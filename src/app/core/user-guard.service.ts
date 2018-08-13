import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class UserGuard implements CanActivate {
    private role: String = '';
    private isUser: Boolean = false;
    constructor(private _auth: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = localStorage.getItem('currentUser');
        this.role = this._auth.getRole();
        if (this.role.indexOf('User') !== -1) {
        this.isUser = true;
        }
        if (this.isUser) {
            return true;
        }
        return false;
    }
}
