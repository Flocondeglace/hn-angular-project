import { HttpClient } from '@angular/common/http';
import {
  Component,
  DestroyRef,
  inject,
  input,
  OnChanges,
  signal,
  SimpleChanges,
} from '@angular/core';
import { TransactionData } from '../transaction.model';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-transaction-description',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './transaction-description.html',
  styleUrl: './transaction-description.css',
})
export class TransactionDescription implements OnChanges {
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  transactionId = input.required<string>();
  transaction = signal<TransactionData | undefined>(undefined);

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['transactionId']) {
      return;
    }
    // fetch the new transaction from the transaction id
    const subscription = this.httpClient
      .get<TransactionData>(`data/${this.transactionId()}.json`)
      .subscribe({ next: (transaction) => this.transaction.set(transaction) });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
