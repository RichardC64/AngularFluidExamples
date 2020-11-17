import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { IDiceRoller } from './fluid-object/dice-roller-data-object';
import { DiceRollerContainerRuntimeFactory } from './services/dice-roller-container-factory';
import { FluidLoaderService } from './services/fluid-loader.service';

@Component({
  selector: 'app-root',
  template: `
  <div style='min-height: 100%;'>
    <div style="text-align: center;">
      <div style="font-size: 200px;" [style.color]='color'>{{value}}</div>
      <button style="font-size: 50px;"  (click)='onRoll()'>Roll</button>
    </div>
  </div>`
})
export class AppComponent implements OnInit {
  title = 'Angular Fluid Hello World';
  value = '';
  color = '';
  private sub!: Subscription;
  private diceRoller!: IDiceRoller;

  constructor(
    private fluidLoaderService: FluidLoaderService,
    private changeDetector: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.updateDiceChar(2);

    this.sub = this.fluidLoaderService.loadDataObject$<IDiceRoller>(DiceRollerContainerRuntimeFactory).pipe(
      switchMap((diceRoller) => {
        this.diceRoller = diceRoller;
        return diceRoller.dataChanged$;
      }), tap(() => {
        console.log('datas received');
        this.updateDiceChar(this.diceRoller.value);
        // force UI update
        this.changeDetector.detectChanges();
      })
    ).subscribe();

  }

  onRoll(): void{
    this.diceRoller.roll();
  }

  updateDiceChar(diceValue: number): void {
    this.value = String.fromCodePoint(0x267F + diceValue);
    this.color = `hsl(${diceValue * 60}, 70%, 50%)`;
  }
}
