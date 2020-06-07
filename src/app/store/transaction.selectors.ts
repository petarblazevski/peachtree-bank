import { createSelector } from '@ngrx/store';
import { IState } from './index';
import { IState as TransactionState } from './transaction.reducer';

export const selectTransactionFeature = (state: IState) => state.transactions;

export const selectTransactions = createSelector(
  selectTransactionFeature,
  (state: TransactionState) => state.transactions
);

export const selectMerchants = createSelector(
  selectTransactionFeature,
  (state: TransactionState) => state.merchants
);
