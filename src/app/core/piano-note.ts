export class PianoNote {
  octave: number;
  name: string;
  accidental?: string;  // f | s
  fullname: string;

  constructor(public keyId: number, public noteId: string) {

    if (keyId < 16 || keyId > 64) {
      throw new RangeError('Invalid keyId. The valid range of keyId is 16 to 64.');
    }

    if (noteId.length < 2 || noteId.length > 3) {
      throw new RangeError('noteId is invalid');
    }

    this.name = noteId[0].toLowerCase();
    // thu cua quang tam
    this.octave = parseInt(noteId[1], 10);

    let accidentalSymbol = '';

    if (noteId.length === 3) {
      this.accidental = noteId[2];

      if (this.accidental === 's') {
        accidentalSymbol = '\u266F';
      } else if (this.accidental === 'f') {
        accidentalSymbol = '\u266D';
      }
    }

    this.fullname = this.name.toUpperCase() + accidentalSymbol;
  }

}
