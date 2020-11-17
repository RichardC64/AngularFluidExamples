import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { INoteWithVotes, IUser, Notero } from './fluid-object';
import { NoteroContainerFactory } from './services';
import { FluidLoaderService } from './services/fluid-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'AngularFluidBrainstorm';
  private sub!: Subscription;
  model!: Notero;
users!: IUser[];
user! : IUser;
notes!: INoteWithVotes[];
highlightMine = false;

  constructor(
    private fluidLoaderService: FluidLoaderService,
    private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.sub = this.fluidLoaderService.loadDataObject$<Notero>(NoteroContainerFactory).pipe(
      switchMap((notero) => {
        this.model = notero;
        return notero.dataChanged$;
      }), tap((value) => {
        console.log('datas received');
        this.users = this.model.getUsers();
        this.user = this.model.getUser();
        this.notes = this.model.getNotesFromBoard();
        // force UI update
        this.changeDetector.detectChanges();
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onCreateNote(noteText: string){
    this.model.createNote(noteText);
  }

  onVote(note: INoteWithVotes){
    this.model.vote(note);
  }
}
