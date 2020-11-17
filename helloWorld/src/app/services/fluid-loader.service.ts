import { Injectable } from '@angular/core';
import { getTinyliciousContainer } from '@fluidframework/get-tinylicious-container';
import { getDefaultObjectFromContainer } from '@fluidframework/aqueduct';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

// inspired from https://github.com/DanWahlin/FluidAngular
@Injectable({ providedIn: 'root' })
export class FluidLoaderService {

    documentId: string;
    createNew = false;

    constructor() {
        if (window.location.hash.length === 0) {
            this.createNew = true;
            window.location.hash = Date.now().toString();
        }
        this.documentId = window.location.hash.substring(1);
    }

    loadDataObject$<T>(factory: any): Observable<T> {
        return from(getTinyliciousContainer(this.documentId, factory, this.createNew))
            .pipe(
                switchMap(container => from(getDefaultObjectFromContainer<T>(container)))
            );
    }
}