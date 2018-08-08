import { RemoveSongComponent } from './../remove-song/remove-song.component';
import { ToastrService } from 'ngx-toastr';
import { PianoService } from './../core/piano.service';
import { SongService } from './../core/song.service';
import { EditAccountComponent } from './../edit-account/edit-account.component';
import { AccountDialogComponent } from './../account-dialog/account-dialog.component';
import { AccountService } from './../core/account.service';
import { AuthenticationService } from './../core/authentication.service';
import { Component, OnInit } from '@angular/core';
import { IAccount } from '../core/IAccount';
import { MatDialog, MatDialogRef } from '../../../node_modules/@angular/material';
import { RemoveAccountComponent } from '../remove-account/remove-account.component';
import { ISong } from '../core/ISong';
import decode from 'jwt-decode';

@Component({
    selector: 'app-song',
    templateUrl: './song.component.html',
    styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit {
    private songs: ISong[];
    private chooseSong: ISong[];
    private token = localStorage.getItem('currentUser');
    private keyw: String = '';
    private pageSize: Number = 3;
    private page: any = 1;
    private disabledNextPageBtn: Boolean = false;
    private numberOfItem: number;
    private role: String = '';
    private isAd: Boolean = false;
    private access: Boolean = false;
    songEdit: ISong = {
        Name: '',
        KeyIds: '',
    };
    UserId: string;
    // SongDialogRef: MatDialogRef<SongDialogComponent>;
    constructor(
        private toastr: ToastrService,
        private pianoService: PianoService,
        private _songService: SongService,
        private _auth: AuthenticationService,
        private dialog: MatDialog
    ) { }

    ngOnInit() {if (this.token) {
        const tokenPayload = decode(this.token);
        this.UserId = tokenPayload.nameid;
    }
        this._songService.getSongs();
        this._songService.songs.subscribe(song => {
            this.songs = song.filter(em => em.UserId.toLowerCase().includes(this.UserId.toLowerCase()));
            this.chooseSong = song;
        });
        if (this.token) {
            this.access = false;
        }
    }

    searchSong(key: string) {
        this.songs = this.chooseSong.filter(em => em.Name.toLowerCase().includes(key.toLowerCase()));
    }
    async play(playingSong: ISong) {
        let i = 0;
        while (i < playingSong.KeyIds.length) {
            const chuoi = playingSong.KeyIds.substr(i, 2);
            const x = parseInt(chuoi, 10);
            this.pianoService.playNoteByKeyId(x);
            await this.wait(390);
            i = i + 2;
        }
    }
    wait(time) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, time);
        });
    }
    songEditChoose(songEditIn: ISong) {
        this.songEdit = songEditIn;
        // console.log(this.songEdit.Id);
    }
    editSong() {
        // console.log(this.songEdit.Name);
        this._songService.editSong(this.songEdit);
        this.toastr.success('Song name changed to ' + this.songEdit.Name, 'Success!');
    }
    openRemoveSongDialog(removeSong: ISong) {
        const dialogRef = this.dialog.open(RemoveSongComponent, {
            width: '400px',
            height: 'auto',
            data: removeSong
        });
    }

    // Phân trang
    totalPages() {
        this._songService.getSongs();
        this._songService.songs.subscribe(ems => {
            this.songs = ems;
        });
    }

    changePage(move) {
        this.page = this.page + move;
        this.totalPages();
        if (this.page < 1) {
            this.page = 1;
        } else if (this.songs.length < 5) {
            this.disabledNextPageBtn = true;
        } else {
            this.disabledNextPageBtn = false;
        }
    }
}
