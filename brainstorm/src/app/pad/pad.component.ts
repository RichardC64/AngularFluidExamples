import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../fluid-object';
import { AutoNote } from '../fluid-object/demo';

@Component({
  selector: 'app-pad',
  templateUrl: './pad.component.html',
  styleUrls: ['./pad.component.scss', '../note-editor.scss']
})
export class PadComponent {

  highlightMine = false;
  @Input() user!: IUser;
  @Input() users!: IUser[];

  @Output() createNote: EventEmitter<string> = new EventEmitter<string>();
  @Output() highlightUser: EventEmitter<boolean> = new EventEmitter<boolean>();

  noteText: string = '';

  onCreateNote() {
    this.createNote.emit(this.noteText);
    this.noteText = '';
  }

  onNoteFocus() {
    if (!this.noteText.length) {
      this.noteText = AutoNote.createDemoNote();
    }
  }

  onHighlightMe(){
    this.highlightMine = !this.highlightMine;
    this.highlightUser.emit(this.highlightMine);
  }
}
