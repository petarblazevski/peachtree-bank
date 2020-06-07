import { Action, createReducer, on } from '@ngrx/store';

import { Transaction } from '../entities/transaction.entity';
import * as transactionActions from './transaction.actions';

export interface IState {
  loading: boolean;
  transactions: Transaction[];
  merchants: string[];
}

export const initialState: IState = {
  loading: true,
  transactions: null,
  merchants: null,
};

const transactionReducer = createReducer(
  initialState,
  on(transactionActions.loadTransactions, (state, { transactions }) => ({
    ...state,
    loading: false,
    transactions,
    merchants: [
      ...new Set(transactions.map((transaction) => transaction.merchant)),
    ],
  }))
);

export function reducer(state: IState | undefined, action: Action) {
  return transactionReducer(state, action);
}
