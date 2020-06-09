export class Transaction {
  amount: string;
  categoryCode: string;
  merchant: string;
  merchantLogo: string;
  transactionDate: number;
  transactionType: TransactionType;
}

export enum TransactionType {
  OnlineTransfer = 'Online Transfer',
  CardPayment = 'Card Payment',
  Transaction = 'Transaction',
}
