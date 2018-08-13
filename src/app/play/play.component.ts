import { NotationService } from './../notation/notation.service';
import { ToastrService } from 'ngx-toastr';
import { ISong } from './../core/ISong';
import { SongService } from './../core/song.service';
import { PianoNote } from './../core/piano-note';
import { PianoService } from './../core/piano.service';
import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {
  token = localStorage.getItem('currentUser');
  access: Boolean = false;
  UserId: string;
  songs: ISong[];
  playedNote: string;
  CreatedDate: String = '';
  songAdding: ISong = {
    Name: '',
    KeyIds: '',
  };
  songEdit: ISong = {
    Name: '',
    KeyIds: '',
  };
  private playingNote = '16161816212016161816232116162825212018262625212321';
  constructor(
    private _notationService: NotationService,
    private toastr: ToastrService,
    private pianoService: PianoService,
    private _songService: SongService
  ) { }

  ngOnInit() {
    if (this.token) {
      const tokenPayload = decode(this.token);
      this.UserId = tokenPayload.nameid;
      if (this.UserId !== '') {
        this.access = true;
      } else { this.access = false; }
      // console.log(this.CreatedDate);
    }
    this._notationService.clear();
    // this.soundService.initialize();
    // this._songService.getSongs();
    // this._songService.songs.subscribe(song => {
    //   this.songs = song;
    // });
  }
  handleKeyPlayed(keyId: number) {
    this.pianoService.playNoteByKeyId(keyId);
    this.songAdding.KeyIds = this.songAdding.KeyIds + keyId.toString();
    // this.playedNote = this.playedNote + keyId.toString();
    // console.log(this.playedNote);
  }
  addSong() {
    if (!this.songAdding.CreatedDate) {
      this.songAdding.UserId = this.UserId;
      this.CreatedDate = new Date().toString();
      this.songAdding.CreatedDate = this.CreatedDate.toString();
      if (this.songAdding.Name !== '' && this.songAdding.KeyIds !== '') {
        this._songService.createSong(this.songAdding);
        console.log('new');
        localStorage.setItem('currentKeyIds', this.songAdding.KeyIds);
        // Toastr
        this.toastr.success('Song Added!', 'Success!');
      } else if (this.songAdding.Name === '') {
        this.toastr.error('Name is required', 'Error!', {
          timeOut: 3000,
        });
      } else {
        this.toastr.error('Please press some key', 'Error!', {
          timeOut: 3000,
        });
      }
    } else {
      this._songService.getSongs();
      console.log(this.songAdding.Name);
      const currentKeyIds = localStorage.getItem('currentKeyIds');
      this._songService.songs.subscribe(song => {
        this.songs = song;
        });
        this.songEdit = this.songs.find(em => em.KeyIds.includes(currentKeyIds));
      console.log(this.songEdit.Id);
      this._songService.editSong(this.songEdit);
    }
  }
  // update
  async play() {
    let i = 0;
    while (i < this.songAdding.KeyIds.length) {
      const chuoi = this.songAdding.KeyIds.substr(i, 2);
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
}
