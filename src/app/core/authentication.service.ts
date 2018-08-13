import { HttpClient, HttpHeaders, HttpErrorResponse, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'Rxjs';
import 'rxjs/add/operator/map';
import decode from 'jwt-decode';

@Injectable()
export class AuthenticationService {
    public token: string;
    grant_type: String = 'password';
    constructor(private http: Http) {
        // set token if saved in local storage
        this.token = localStorage.getItem('currentUser');
    }
    body = new URLSearchParams();

    headers = new Headers();
    login(username: string, password: string): Observable<boolean> {
        this.body.set('username', username);
        this.body.set('password', password);
        this.body.set('grant_type', 'password');
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post('http://localhost:8888/api/accounts/token',
            this.body.toString()).map((response: Response) => {
                // login successful if there's a jwt token in the response
                const token = response.json() && response.json().access_token;
                console.log(response.json());
                if (token) {
                    this.token = token;

                    localStorage.setItem('currentUser', this.token);
                    // return true to successful
                    return true;
                } else {
                    // return false to failed
                    return false;
                }
            });
    }

    logout(): void {
        this.token = null;
        localStorage.removeItem('currentUser');
    }
    getRole(): string {
        const token = localStorage.getItem('currentUser');
        const tokenPayload = decode(token);
        const role = tokenPayload.role;
        return role;
    }
}
