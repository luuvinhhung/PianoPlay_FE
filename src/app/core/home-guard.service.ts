import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class HomeGuard implements CanActivate {
    constructor() { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            return true;
        }
        return false;
    }
}
