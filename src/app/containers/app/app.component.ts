import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IState } from '../../store';
import * as transactionSelectors from '../../store/transaction.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  merchants$: Observable<string[]> = this.store.pipe(
    select(transactionSelectors.selectMerchants)
  );

  constructor(private store: Store<IState>) {}
}
