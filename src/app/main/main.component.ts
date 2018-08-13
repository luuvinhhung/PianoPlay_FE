import { ISong } from './../core/ISong';
import { SongService } from './../core/song.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from './../core/authentication.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  private _opened: Boolean = false;
  private _docked: Boolean = true;
  private _mode: String = 'over';
  private _dockedSize: String = '60px';
  private _backDrop: Boolean = false;
  private activeGuide: Boolean = false;
  private activePlay: Boolean = true;
  private activeList: Boolean = false;
  private activeAcc: Boolean = false;
  private position: String = 'right';
  private token = localStorage.getItem('currentUser');
  private role: String = '';
  private isAd: Boolean = false;
  private access: Boolean = false;
  private UserId: string;
  constructor(
    private _songService: SongService,
    private toastr: ToastrService,
    private route: Router,
    private _authService: AuthenticationService) { }
  private songs: ISong[];
  private chooseSong: ISong[];
  ngOnInit() {
    if (this.token) {
      const tokenPayload = decode(this.token);
      this.role = this._authService.getRole();
      this.UserId = tokenPayload.nameid;
      this.access = true;
      if (this.role.indexOf('Admin') !== -1) {
        this.isAd = true;
      }
    }
    // console.log(tokenPayload.role);
    // console.log(tokenPayload.nameid);
  }
  private _toggleSidebar() {
    this._opened = !this._opened;
    this._docked = !this._docked;
  }
  guide() {
    this.route.navigate(['/home/guide']);
    this.activeGuide = true;
    this.activePlay = this.activeList = this.activeAcc = false;
  }
  play() {
    this.route.navigate(['/home/play']);
    this.activePlay = true;
    this.activeGuide = this.activeList = this.activeAcc = false;
  }
  list() {
    if (this.access) {
      this.route.navigate(['/home/songs']);
      this.activeList = true;
      this.activeGuide = this.activePlay = this.activeAcc = false;
    } else {
      this.route.navigate(['/home/play']);
      this.toastr.warning('You need to login to perform this operation', 'Warning!', {
        timeOut: 3000,
      });
      this.activePlay = true;
      this.activeGuide = this.activeList = this.activeAcc = false;
    }
  }
  account() {
    this.route.navigate(['/home/accounts']);
    this.activeAcc = true;
    this.activeGuide = this.activePlay = this.activeList = false;
  }
}
