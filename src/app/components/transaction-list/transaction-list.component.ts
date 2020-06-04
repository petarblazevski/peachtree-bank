import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from '../../entities/transaction.entity';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
})
export class TransactionListComponent implements OnInit {
  @Input() transactions: Transaction[];

  constructor() {}

  ngOnInit(): void {}
}
