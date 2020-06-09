import { Action, createReducer, on } from '@ngrx/store';

import { Transaction } from '../entities/transaction.entity';
import * as transactionActions from './transaction.actions';

export interface IState {
  loading: boolean;
  transactions: Transaction[];
  originalTransactions: Transaction[];
  merchants: string[];
  balance: number;
}

export const initialState: IState = {
  loading: true,
  transactions: null,
  originalTransactions: null,
  merchants: null,
  balance: 5824.76,
};

const transactionReducer = createReducer(
  initialState,

  on(transactionActions.loadTransactions, (state, { transactions }) => ({
    ...state,
    loading: false,
    transactions,
    originalTransactions: transactions,
    merchants: [
      ...new Set(transactions.map((transaction) => transaction.merchant)),
    ],
  })),

  on(transactionActions.createTransaction, (state, { toAccount, amount }) => {
    const merchantInfo = state.transactions.find(
      (transaction) => transaction.merchant === toAccount
    );
    const newTransaction: Transaction = {
      ...merchantInfo,
      amount: amount.toString(),
      transactionDate: new Date().getTime(),
    };

    return {
      ...state,
      balance: state.balance - amount,
      transactions: [...state.transactions, newTransaction],
    };
  }),

  on(transactionActions.filterTransactions, (state, { query, sortOptions }) => {
    const filteredTransactions = state.originalTransactions.filter(
      (transaction) =>
        transaction.merchant.toLowerCase().includes(query.toLowerCase()) ||
        transaction.amount.includes(query) ||
        transaction.transactionType.toLowerCase().includes(query.toLowerCase())
    );

    filteredTransactions.sort((a, b) => {
      if (a[sortOptions.type] > b[sortOptions.type]) {
        return 1;
      }

      if (a[sortOptions.type] < b[sortOptions.type]) {
        return -1;
      }

      return 0;
    });

    if (sortOptions.direction === 'desc') {
      filteredTransactions.reverse();
    }

    return {
      ...state,
      transactions: [...filteredTransactions],
    };
  })
);

export function reducer(state: IState | undefined, action: Action) {
  return transactionReducer(state, action);
}
