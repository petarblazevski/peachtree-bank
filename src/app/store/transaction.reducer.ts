import { Action, createReducer, on } from '@ngrx/store';

import { Transaction, TransactionType } from '../entities/transaction.entity';
import * as transactionActions from './transaction.actions';
import { SortOptions } from '../interfaces/sort-options';

export interface IState {
  loading: boolean;
  transactions: Transaction[];
  originalTransactions: Transaction[];
  merchants: string[];
  balance: number;
  query: string;
  sortOptions: SortOptions;
}

export const initialState: IState = {
  loading: true,
  transactions: null,
  originalTransactions: null,
  merchants: null,
  balance: 5824.76,
  query: '',
  sortOptions: { type: 'transactionDate', direction: '' },
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
    const merchantInfo = state.originalTransactions.find(
      (transaction) => transaction.merchant === toAccount
    );
    const newTransaction: Transaction = {
      ...merchantInfo,
      amount: amount.toString(),
      transactionDate: new Date().getTime(),
      transactionType: TransactionType.OnlineTransfer,
    };

    const modifiedTransactions = [
      ...state.originalTransactions,
      newTransaction,
    ];

    return {
      ...state,
      balance: state.balance - amount,
      originalTransactions: [...modifiedTransactions],
      transactions: [
        ...filterTransactions(
          modifiedTransactions,
          state.query,
          state.sortOptions
        ),
      ],
    };
  }),

  on(transactionActions.filterTransactions, (state, { query, sortOptions }) => {
    return {
      ...state,
      transactions: [
        ...filterTransactions(state.originalTransactions, query, sortOptions),
      ],
      query,
      sortOptions,
    };
  })
);

const filterTransactions = (transactions, query, sortOptions) => {
  const filteredTransactions = transactions.filter(
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

  return filteredTransactions;
};

export function reducer(state: IState | undefined, action: Action) {
  return transactionReducer(state, action);
}
