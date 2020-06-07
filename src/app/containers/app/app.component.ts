import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IState } from '../../store';
import * as transactionSelectors from '../../store/transaction.selectors';
import * as transactionActions from '../../store/transaction.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  merchants$: Observable<string[]> = this.store.pipe(
    select(transactionSelectors.selectMerchants)
  );

  balance$: Observable<number> = this.store.pipe(
    select(transactionSelectors.selectBalance)
  );

  constructor(private store: Store<IState>) {}

  createTransaction(value) {
    this.store.dispatch(transactionActions.requestNewTransaction(value));
  }
}
