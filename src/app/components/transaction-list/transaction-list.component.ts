import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Transaction } from '../../entities/transaction.entity';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
})
export class TransactionListComponent implements OnInit, OnChanges {
  @Input() transactions: Transaction[];
  @Input() query: string;

  filteredTransactions: Transaction[];

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.filteredTransactions = this.query
      ? this.transactions.filter(
          (transaction) =>
            transaction.merchant
              .toLowerCase()
              .includes(this.query.toLowerCase()) ||
            transaction.amount.includes(this.query) ||
            transaction.transactionType
              .toLowerCase()
              .includes(this.query.toLowerCase())
        )
      : this.transactions;
  }
}
