import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../entities/transaction.entity';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getAllTransactions(): Observable<{ data: Transaction[] }> {
    return this.http.get<{ data: Transaction[] }>('/mock/transactions.json');
  }
}
