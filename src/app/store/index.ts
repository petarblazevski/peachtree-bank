import { ActionReducerMap } from '@ngrx/store';
import * as transactionReducer from './transaction.reducer';

export interface IState {
  transactions: transactionReducer.IState;
}

export const reducers: ActionReducerMap<IState> = {
  transactions: transactionReducer.reducer,
};
