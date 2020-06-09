export type SortDirection = 'asc' | 'desc' | '';
export type SortType = 'transactionDate' | 'merchant' | 'amount' | '';

export interface SortOptions {
  type: SortType;
  direction: SortDirection;
}
