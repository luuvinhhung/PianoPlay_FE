import { ToastrService } from 'ngx-toastr';
import { ISong } from './../core/ISong';
import { SongService } from './../core/song.service';
import { AccountService } from './../core/account.service';
import { IAccount } from './../core/IAccount';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-remove-account',
  templateUrl: './remove-account.component.html',
  styleUrls: ['./remove-account.component.scss']
})
export class RemoveAccountComponent implements OnInit {
  private songs: ISong[];
  private chooseSong: ISong[];
  private account: IAccount;
  private confirmDel: boolean;
  constructor(
    private toastr: ToastrService,
    private _accountService: AccountService,
    private _songService: SongService,
    public dialogRef: MatDialogRef<RemoveAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.account = data;
  }

  ngOnInit() {

  }

  removeAcc() {
    // lay danh sach bai hat
    this._songService.getSongs();
    this._songService.songs.subscribe(song => {
      this.songs = song;
      this.chooseSong = song;
    });
    this.songs = this.chooseSong.filter(em => em.UserId.toLowerCase().includes(this.account.Id.toString()));

    // kiem tra tai khoan ton tai bai hat thi confirm xac nhan xoa
    if (this.songs.length > 0) {
      this.confirmDel = confirm('This user have ' + this.songs.length.toString() + ' song(s)');
      // console.log(this.confirmDel);
      if (this.confirmDel) {
        this.account.Status = false;
        this._accountService.removeAccount(this.account);
        this.toastr.success(this.account.username + ' deleted' , 'Success!');
      }
    } else {
      this.account.Status = false;
      this._accountService.removeAccount(this.account);
    }
    // this._accountService.removeAccount(this.account);
    this.dialogRef.close();
  }

}
