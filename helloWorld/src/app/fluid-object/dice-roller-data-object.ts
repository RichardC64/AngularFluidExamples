// Original file from Microsoft Corporation can be find at : https://github.com/microsoft/FluidHelloWorld

import { DataObject, DataObjectFactory } from '@fluidframework/aqueduct';
import { IValueChanged } from '@fluidframework/map';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * IDiceRoller describes the public API surface for our dice roller data object.
 */
export interface IDiceRoller {
    /**
     * Get the dice value as a number.
     */
    readonly value: number;

    /**
     * Roll the dice.  Will cause a "diceRolled" event to be emitted.
     */
    roll: () => void;

    dataChanged$: Observable<number>;
}

// The root is map-like, so we'll use this key for storing the value.
const diceValueKey = 'diceValue';

/**
 * The DiceRoller is our data object that implements the IDiceRoller interface.
 */
export class DiceRoller extends DataObject implements IDiceRoller {
    private dataChangedSubject$ = new BehaviorSubject<number>(1);
    dataChanged$ = this.dataChangedSubject$.asObservable();

    /**
     * initializingFirstTime is run only once by the first client to create the DataObject.  Here we use it to
     * initialize the state of the DataObject.
     */
    protected async initializingFirstTime(): Promise<void> {
        this.root.set(diceValueKey, 1);
    }

    /**
     * hasInitialized is run by each client as they load the DataObject.  Here we use it to set up usage of the
     * DataObject, by registering an event listener for dice rolls.
     */
    protected async hasInitialized(): Promise<void> {
        this.root.on('valueChanged', (changed: IValueChanged) => {
            if (changed.key === diceValueKey) {
                // When we see the dice value change, we'll emit the diceRolled event we specified in our interface.
                this.dataChangedSubject$.next(this.value);
            }
        });
    }

    public get value(): number {
        return this.root.get(diceValueKey);
    }

    public readonly roll = () => {
        const rollValue = Math.floor(Math.random() * 6) + 1;
        this.root.set(diceValueKey, rollValue);
    }
}

/**
 * The DataObjectFactory is used by Fluid Framework to instantiate our DataObject.  We provide it with a unique name
 * and the constructor it will call.  In this scenario, the third and fourth arguments are not used.
 */
export const DiceRollerInstantiationFactory = new DataObjectFactory(
    'dice-roller',
    DiceRoller,
    [],
    {},
);
