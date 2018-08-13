import { PianoService } from './../core/piano.service';
import { PianoNote } from './../core/piano-note';
import { Component, Input, OnInit, AfterViewChecked } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { NotationService } from './notation.service';


declare var $: any;

@Component({
  selector: 'app-notation',
  templateUrl: './notation.component.html',
  styleUrls: ['./notation.component.css']
})
export class NotationComponent implements OnInit {
  subscription: Subscription;
  notationAsSVG: any;

  constructor(private pianoService: PianoService, private notationService: NotationService) {
    this.subscription = pianoService.notePlayed$.subscribe(note => this.handleNotePlayed(note));
  }

  ngOnInit() {
    this.notationAsSVG = this.notationService.renderNotation();
  }

  handleNotePlayed(note: PianoNote) {
        this.notationService.addNote(note);
        this.notationAsSVG = this.notationService.renderNotation();
  }

  noteClicked(id: number) {
    // console.log('noteClicked: ' + id);
    this.pianoService.playNote(this.notationService.notes[id].noteId);
  }

  clear() {
    this.notationService.clear();
    this.notationAsSVG = this.notationService.renderNotation();
  }

  addNote(note: PianoNote) {
    this.notationService.addNote(note);
    this.notationAsSVG = this.notationService.renderNotation();
  }
}
