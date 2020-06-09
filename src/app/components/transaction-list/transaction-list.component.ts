import { Component, Input } from '@angular/core';
import { Transaction } from '../../entities/transaction.entity';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
})
export class TransactionListComponent {
  @Input() transactions: Transaction[];

  constructor() {}
}
