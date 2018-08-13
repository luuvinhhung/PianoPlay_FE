import { NotationService } from './../notation/notation.service';
import { AccountService } from './../core/account.service';
import { EditAccountComponent } from './../edit-account/edit-account.component';
import { IAccount } from './../core/IAccount';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from './../core/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { MatDialog, MatDialogRef } from '../../../node_modules/@angular/material';
import decode from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: String = localStorage.getItem('currentUser');
  access: Boolean;
  index: number;
  accounts: IAccount[];
  UserId: string;
  editAccount: IAccount = {
    username: '',
    password: '',
  };
  chooseAccount: IAccount[];
  constructor(
    private _notationService: NotationService,
    private _accountService: AccountService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router,
    private _authService: AuthenticationService
  ) { }

  ngOnInit() {
    if (this.currentUser) {
      const tokenPayload = decode(this.currentUser);
      this.UserId = tokenPayload.nameid;
      this.access = true;
      this._accountService.getAccounts();
      this._accountService.accounts.subscribe(ems => {
        this.editAccount = ems.find(em => em.Id.toLowerCase().includes(this.UserId.toLowerCase()));
        this.chooseAccount = ems;
      });
    }
    // this.editAccount = this.accounts.find(em => em.Id.toLowerCase().includes(this.UserId.toLowerCase()));
  }
  openEditAccountDialog() {
    // console.log(this.editAccount.Id);
    this._accountService.getAccounts();
      this._accountService.accounts.subscribe(ems => {
        this.editAccount = ems.find(em => em.Id.toLowerCase().includes(this.UserId.toLowerCase()));
        this.chooseAccount = ems;
      });
    console.log(this.editAccount.Id);
    const dialogRef = this.dialog.open(EditAccountComponent, {
      width: '500px',
      height: '610px',
      data: this.editAccount
    });
  }
  logout() {
    this._authService.logout();
    this._notationService.clear();
    this.router.navigate(['../login']);
    this.toastr.success('Good bye!', 'Logout Success!');
  }
}
