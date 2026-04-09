import { Component, input } from '@angular/core';
import { TransactionData } from './transaction.model';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'tr[app-transaction]',
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './transaction.html',
  styleUrl: './transaction.css',
})
export class Transaction {
  transactionData = input.required<TransactionData>();
}
