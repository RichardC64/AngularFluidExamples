import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PadComponent } from './pad/pad.component';
import { BoardComponent } from './board/board.component';
import { FormsModule } from '@angular/forms';
import { UserNameComponent } from './pad/user-name.component';

@NgModule({
  declarations: [
    AppComponent,
    PadComponent,
    BoardComponent,
    UserNameComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
