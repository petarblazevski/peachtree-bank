import { HeaderComponent } from './header/header.component';
import { FiltersComponent } from './filters/filters.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransferFormComponent } from './transfer-form/transfer-form.component';

export const components: any[] = [
  HeaderComponent,
  FiltersComponent,
  TransactionListComponent,
  TransferFormComponent,
];

export * from './header/header.component';
export * from './filters/filters.component';
export * from './transaction-list/transaction-list.component';
export * from './transfer-form/transfer-form.component';
