import { createAction, props } from '@ngrx/store';
import { Transaction } from '../entities/transaction.entity';
import { NewTransaction } from '../interfaces/new-transaction';
import { SortOptions } from '../interfaces/sort-options';

export const loadTransactions = createAction(
  '[Transactions] Load transactions',
  props<{ transactions: Transaction[] }>()
);

export const loadFailure = createAction(
  '[Transactions] Load failure',
  props<{ error: any }>()
);

export const requestNewTransaction = createAction(
  '[Transactions] Request new transaction',
  props<NewTransaction>()
);

export const createTransaction = createAction(
  '[Transactions] New transaction',
  props<NewTransaction>()
);

export const failedTransaction = createAction(
  '[Transactions] Failed transaction',
  props<{ reason: string }>()
);

export const filterTransactions = createAction(
  '[Transactions] Filter transactions',
  props<{ query: string; sortOptions: SortOptions }>()
);
