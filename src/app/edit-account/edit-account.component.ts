import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from './../core/authentication.service';
import { AccountService } from './../core/account.service';
import { IAccount } from './../core/IAccount';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class EditAccountComponent implements OnInit {
  token = localStorage.getItem('currentUser');
  role: String = '';
  isAd: Boolean = false;
  isUser: Boolean = false;
  private repeatPassword: String = '';
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  matcher = new MyErrorStateMatcher();
  account: IAccount = {
    username: '',
    password: ''
  };

  constructor(
    private toastr: ToastrService,
    private _auth: AuthenticationService,
    private _accountService: AccountService,
    public dialogRef: MatDialogRef<EditAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.account = data;
  }

  ngOnInit() {
    if (this.token) {
      this.role = this._auth.getRole();
      if (this.role.indexOf('Admin') !== -1) {
        this.isAd = true;
      } else {
        this.isUser = true;
      }
    }
  }

  editAcc() {
    // this._accountService.editAccount(this.account);
    if (this.account.password !== '' && this.account.password === this.repeatPassword
      && isNaN(this.account.phoneNumber) === false) {
      this._accountService.editAccount(this.account);
      this.dialogRef.close();
      // Toastr
      this.toastr.success('Saved!', 'Success!');
    } else if (this.account.password !== this.repeatPassword) {
      this.toastr.error('Confirm Password Not Match', 'Error!', {
        timeOut: 3000,
      });
    } else if (isNaN(this.account.phoneNumber) === true) {
      this.toastr.error('Phone Numbers must be Numeric only!', 'Error!', {
        timeOut: 3000,
      });
    }
  }

}
