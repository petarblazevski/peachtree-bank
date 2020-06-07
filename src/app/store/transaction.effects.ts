import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
  ROOT_EFFECTS_INIT,
} from '@ngrx/effects';
import { of } from 'rxjs';
import {
  catchError,
  concatMap,
  exhaustMap,
  map,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';

import { ApiService } from '../services/api.service';
import * as transactionActions from './transaction.actions';
import { IState } from './index';
import { selectBalance } from './transaction.selectors';

const LIMIT = -500;

@Injectable()
export class TransactionEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      exhaustMap(() =>
        this.service.getAllTransactions().pipe(
          map((payload) =>
            transactionActions.loadTransactions({ transactions: payload.data })
          ),
          catchError((error) => of(transactionActions.loadFailure({ error })))
        )
      )
    )
  );

  requestNewTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(transactionActions.requestNewTransaction),
      concatMap((action) =>
        of(action).pipe(withLatestFrom(this.store.pipe(select(selectBalance))))
      ),
      map(([payload, balance]) => {
        if (balance - payload.amount < LIMIT) {
          return transactionActions.failedTransaction({
            reason: `You are exceeding the allowed amount of "$ ${LIMIT}"`,
          });
        } else {
          return transactionActions.createTransaction(payload);
        }
      })
    )
  );

  failedTransaction$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(transactionActions.failedTransaction),
        tap((payload) => this.toastr.error(payload.reason))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private service: ApiService,
    private store: Store<IState>,
    private toastr: ToastrService
  ) {}
}
