import { EditAccountComponent } from './../edit-account/edit-account.component';
import { AccountDialogComponent } from './../account-dialog/account-dialog.component';
import { AccountService } from './../core/account.service';
import { AuthenticationService } from './../core/authentication.service';
import { Component, OnInit } from '@angular/core';
import { IAccount } from '../core/IAccount';
import { MatDialog, MatDialogRef } from '../../../node_modules/@angular/material';
import { RemoveAccountComponent } from '../remove-account/remove-account.component';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
    accounts: IAccount[];
    editAccount: IAccount = {
        username: '',
        password: '',
    };
    chooseAccount: IAccount[];
    token = localStorage.getItem('currentUser');
    keyw: String = '';
    pageSize: Number = 3;
    page: any = 1;
    disabledNextPageBtn: Boolean = false;
    numberOfItem: number;
    role: String = '';
    isAd: Boolean = false;

    AccountDialogRef: MatDialogRef<AccountDialogComponent>;
    constructor(
        private _accountService: AccountService,
        private _auth: AuthenticationService,
        private dialog: MatDialog
    ) { }


    ngOnInit() {
        this._accountService.getAccounts();
        this._accountService.accounts.subscribe(ems => {
            this.accounts = ems;
            this.chooseAccount = ems;
        });
        this.role = this._auth.getRole();
        if (this.role.indexOf('Admin') !== -1) {
            this.isAd = true;
        }
        // Sort by name
        this.accounts.sort((a, b) => {
            const nameA = a.fullName.toLowerCase();
            const nameB = b.fullName.toLowerCase();
            if (nameA < nameB) {
                return -1;
            } else if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
        // const tokenPayload = decode(this.token);
        // console.log(tokenPayload.role);
        // console.log(tokenPayload.nameid);
    }
    editAcc() {
        this._accountService.editAccount(this.editAccount);
    }

    searchAccount(key: string) {
        this.accounts = this.chooseAccount.filter(em => em.fullName.toLowerCase().includes(key.toLowerCase()));
    }

    openRemoveAccountDialog(removeAccount: IAccount) {
        const dialogRef = this.dialog.open(RemoveAccountComponent, {
            width: '400px',
            height: 'auto',
            data: removeAccount
        });
    }
    // popup button add
    openAddDialog() {
        this.AccountDialogRef = this.dialog.open(AccountDialogComponent, {
            hasBackdrop: false,
            width: '500px',
            height: '600px'
        });
    }
    openEditAccountDialog(editAccount: IAccount) {
        const dialogRef = this.dialog.open(EditAccountComponent, {
            width: '430px',
            height: '600px',
            data: editAccount
        });
    }
    // Phân trang
    changePageSize() {
        this._accountService.getAccounts();
        this._accountService.accounts.subscribe(ems => {
            this.accounts = ems;
            this.chooseAccount = ems;
        });

        this.accounts.sort((a, b) => {
            const nameA = a.fullName.toLowerCase();
            const nameB = b.fullName.toLowerCase();
            if (nameA < nameB) {
                return -1;
            } else if (nameA > nameB) {
                return 1;
            }

            return 0;
        });
    }

    totalPages() {
        this._accountService.getAccounts();
        this._accountService.accounts.subscribe(ems => {
            this.accounts = ems;
        });
    }

    changePage(move) {
        this.page = this.page + move;
        this.totalPages();
        if (this.page < 1) {
            this.page = 1;
        } else if (this.accounts.length < 5) {
            this.disabledNextPageBtn = true;
        } else {
            this.disabledNextPageBtn = false;
        }
    }
}
