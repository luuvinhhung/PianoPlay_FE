import { IAccount } from './IAccount';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Identifiers } from '@angular/compiler';

@Injectable()
export class AccountService {
  private _account: BehaviorSubject<Array<IAccount>> = new BehaviorSubject(new Array());
  private account: IAccount;
  private token: string;
  headers = new Headers();
  get accounts() {
    return this._account.asObservable();
  }
  constructor(private http: Http) {
    this.token = localStorage.getItem('currentUser');
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.token
    });
  }
  getAccounts() {
    return this.getAccountsFromServer();
  }
  private getAccountsFromServer() {
    this.http.get('http://localhost:8888/api/Accounts/GetAll', { headers: this.headers }).subscribe(res => {
        const accounts = res.json();
        this._account.next(accounts);
      });
  }
  getAccountsByIdFromServer(id: number) {
    this.http.get('http://localhost:8888/api/Accounts/GetById/' + id, { headers: this.headers }).subscribe(res => {
      const accounts = res.json();
      this._account.next(accounts);
    });
  }

  removeAccount(accountEdit: IAccount) {
    return this.http.put('http://localhost:8888/api/Accounts/Update', accountEdit).subscribe(() => {
      const index = this._account.getValue().findIndex(b => b.Id === accountEdit.Id);
      this._account.getValue().splice(index, 1);
      this._account.next(this._account.getValue());
    });
  }
  createAccount(accountAdd: IAccount) {
    return this.http.post('http://localhost:8888/api/Accounts/Create', accountAdd).subscribe(() => {
      this._account.getValue().push(accountAdd);
      const nemAccount = this._account.getValue();
      this._account.next(nemAccount);
    });
  }
  editAccount(accountEdit: IAccount) {
    return this.http.put('http://localhost:8888/api/Accounts/Update', accountEdit).subscribe(() => {
      const index = this._account.getValue().findIndex(acc => acc.Id === accountEdit.Id);
      this._account.getValue()[index] = accountEdit;
      this._account.next(this._account.getValue());
    });
  }

}
