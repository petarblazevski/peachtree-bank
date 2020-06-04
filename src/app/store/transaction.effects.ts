import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
  ROOT_EFFECTS_INIT,
} from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';

import { ApiService } from '../services/api.service';
import { loadFailure, loadTransactions } from './transaction.actions';

@Injectable()
export class TransactionEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      exhaustMap(() =>
        this.service.getAllTransactions().pipe(
          map((payload) => loadTransactions({ transactions: payload.data })),
          catchError((error) => of(loadFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private service: ApiService) {}
}
