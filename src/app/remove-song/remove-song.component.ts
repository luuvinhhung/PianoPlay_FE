import { ToastrService } from 'ngx-toastr';
import { ISong } from './../core/ISong';
import { SongService } from './../core/song.service';
import { AccountService } from './../core/account.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-remove-song',
  templateUrl: './remove-song.component.html',
  styleUrls: ['./remove-song.component.scss']
})
export class RemoveSongComponent implements OnInit {
  private songs: ISong;
  constructor(
    private toastr: ToastrService,
    private _accountService: AccountService,
    private _songService: SongService,
    public dialogRef: MatDialogRef<RemoveSongComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.songs = data;
  }

  ngOnInit() {

  }

  removeSong() {
    this._songService.removeSong(this.songs.Id);
    this.dialogRef.close();
  }

}
