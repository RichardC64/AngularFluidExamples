import { Component, EventEmitter, Input, Output } from '@angular/core';
import { INoteWithVotes, IUser } from '../fluid-object';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss', '../note-editor.scss']
})
export class BoardComponent {

  @Input() notes!: INoteWithVotes[];
  @Input() user!: IUser;
  @Input() highlightMine = false;

  @Output() Vote: EventEmitter<INoteWithVotes> = new EventEmitter<INoteWithVotes>();
  onVote(note: INoteWithVotes): void {
    this.Vote.emit(note);
  }
}
