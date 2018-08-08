import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Injectable } from '@angular/core';
import { Http, Headers, Response  } from '@angular/http';
import { Identifiers } from '@angular/compiler';
import { ISong } from './ISong';

@Injectable()
export class SongService {
  private _songs: BehaviorSubject<Array<ISong>> = new BehaviorSubject(new Array());
  private Song: ISong;
  headers = new Headers();
  get songs() {
    return this._songs.asObservable();
  }
  constructor(private http: Http) { }
  getSongs() {
    return this.getSongsFromServer();
  }
  private getSongsFromServer() {
    this.http.get('http://localhost:8888/api/songs/GetAll').subscribe(res => {
      const songs = res.json();
      this._songs.next(songs);
    });
  }
  getSongsByIdFromServer(songCode) {
    this.http.get('http://localhost:8888/api/songs/GetByCode?code=' + songCode).subscribe(res => {
      const songs = res.json();
      this._songs.next(songs);
    });
  }
  removeSong(id: number) {
    return this.http.delete('http://localhost:8888/api/songs/Delete?id=' + id).subscribe(() => {
      const index = this._songs.getValue().findIndex(b => b.Id === id);
      this._songs.getValue().splice(index, 1);
      this._songs.next(this._songs.getValue());
    });
  }
  createSong(songAdd: ISong) {
    return this.http.post('http://localhost:8888/api/songs/create', songAdd).subscribe(() => {
      this._songs.getValue().push(songAdd);
      const newSong = this._songs.getValue();
      this._songs.next(newSong);
    });
  }
  editSong(songAdd: ISong) {
    return this.http.put('http://localhost:8888/api/songs/Update', songAdd).subscribe(() => {
      const index = this._songs.getValue().findIndex(s => s.Id === songAdd.Id);
      this._songs.getValue()[index] = songAdd;
      this._songs.next(this._songs.getValue());
    });
  }

}
