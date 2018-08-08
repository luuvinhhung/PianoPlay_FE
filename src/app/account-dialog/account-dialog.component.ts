import { AuthenticationService } from './../core/authentication.service';
import { IAccount } from './../core/IAccount';
import { AccountService } from './../core/account.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, ErrorStateMatcher } from '@angular/material';
import { first } from 'rxjs/operators';
import { Router } from '../../../node_modules/@angular/router';
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-account-dialog',
  templateUrl: './account-dialog.component.html',
  styleUrls: ['./account-dialog.component.scss']
})
export class AccountDialogComponent implements OnInit {
  form: FormGroup;
  private repeatPassword: String = '';
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService,
    private _accountService: AccountService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AccountDialogComponent>
  ) { }

  accountAdding: IAccount = {
    username: '',
    password: '',
    phoneNumber: 0
  };

  ngOnInit() {
  }

  addAccount(accountAdding) {
    this.accountAdding.Status = true;
    this.accountAdding.email = this.emailFormControl.value;
    if (accountAdding.username !== '' && accountAdding.password !== '' &&
     accountAdding.password === this.repeatPassword && isNaN(accountAdding.phoneNumber) === false) {
      this._accountService.createAccount(accountAdding);
      this.dialogRef.close();
      // Toastr
      this.toastr.success('Please repeat username, password to join with us!', 'Success!');
    } else if (accountAdding.password !== this.repeatPassword) {
      this.toastr.error('Confirm Password Not Match', 'Error!', {
        timeOut: 3000,
      });
    } else if (accountAdding.username === '') {
      this.toastr.error('Could you tell me your name please!', 'Error!', {
        timeOut: 3000,
      });
    } else if (isNaN(accountAdding.phoneNumber) === true) {
      this.toastr.error('Phone Numbers must be Numeric only!', 'Error!', {
        timeOut: 3000,
      });
    } else {
      this.toastr.error('User Name, Password, Email and Phone are required', 'Error!', {
        timeOut: 3000,
      });
    }
  }

}
