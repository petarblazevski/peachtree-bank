import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Transaction } from '../../entities/transaction.entity';
import { IState } from '../../store';
import * as transactionActions from '../../store/transaction.actions';
import * as transactionSelectors from '../../store/transaction.selectors';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  transactions$: Observable<Transaction[]> = this.store.pipe(
    select(transactionSelectors.selectTransactions)
  );

  query: string;

  constructor(private store: Store<IState>) {}

  ngOnInit(): void {}

  searchTransactions(query) {
    this.query = query;
  }
}
