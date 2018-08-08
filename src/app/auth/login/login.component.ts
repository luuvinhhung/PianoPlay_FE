import { AccountDialogComponent } from './../../account-dialog/account-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../core/authentication.service';
import { error } from 'util';
import { ResourceLoader } from '../../../../node_modules/@angular/compiler';
import { first } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '../../../../node_modules/@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private dialog: MatDialog,
    private authenticationService: AuthenticationService) { }
  error = '';
  AccountDialogRef: MatDialogRef<AccountDialogComponent>;
  ngOnInit() {
    const token = localStorage.getItem('currentUser');
    if (token) {
      this.router.navigate(['/home']);
    }

    this.loginForm = new FormGroup({
      username: new FormControl('', {
        validators: [Validators.required]
      }),
      password: new FormControl('', {
        validators: [Validators.required]
      })
    });
  }
  openAddDialog() {
    this.AccountDialogRef = this.dialog.open(AccountDialogComponent, {
      hasBackdrop: false,
      width: '500px',
      height: '600px'
    });
  }
  onSubmit() {
    this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password).pipe(first())
      .subscribe(result => {
        if (result === true) {
          // login successful
          this.router.navigate(['/home']);
          this.toastr.success('Hello ' + this.loginForm.value.username, 'Success!');
        }
      }, error => {
        this.error = error;
        this.toastr.error('Username or password is incorrect!', 'Error!', {
          timeOut: 3000,
        });
      });
  }

}
