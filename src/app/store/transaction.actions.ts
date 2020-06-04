import { createAction, props } from '@ngrx/store';
import { Transaction } from '../entities/transaction.entity';

export const loadTransactions = createAction(
  '[Transactions] Load transactions',
  props<{ transactions: Transaction[] }>()
);

export const loadFailure = createAction(
  '[Transactions] Load failure',
  props<{ error: any }>()
);
