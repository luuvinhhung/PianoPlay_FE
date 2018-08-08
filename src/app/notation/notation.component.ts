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
export class NotationComponent implements OnInit, AfterViewChecked  {
  subscription: Subscription;
  notationAsSVG: any;
  noteColor: string[];

  constructor(private pianoService: PianoService, private notationService: NotationService) {
    this.subscription = pianoService.notePlayed$.subscribe(note => this.handleNotePlayed(note));
  }

  ngOnInit() {
    // Render the (empty) piano score (will contain hidden notes to ensure staff spans full width)
    this.notationAsSVG = this.notationService.renderNotation();
    this.noteColor = [];
  }

  ngAfterViewChecked() {
    const self = this;
    $('g.note').off().on('click', function() { self.noteClicked(this.id); });

    for (let i = 0; i < this.noteColor.length; i++) {
      if (this.noteColor[i]) {
        $('#' + i).attr('fill', this.noteColor[i], 10);
      }
    }
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
    this.noteColor.length = 0;
    this.notationService.clear();
    this.notationAsSVG = this.notationService.renderNotation();
  }

  addNote(note: PianoNote) {
    this.notationService.addNote(note);
    this.notationAsSVG = this.notationService.renderNotation();
  }
}
