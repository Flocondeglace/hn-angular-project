import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { type TransactionData } from './transaction/transaction.model';
import { Transaction } from './transaction/transaction';
import { interval, map } from 'rxjs';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

export type SortType = 'label' | 'amount' | 'balance' | 'date';
export type SortDirection = 'asc' | 'desc';

@Component({
  selector: 'app-exercise3',
  imports: [Transaction, DatePipe, RouterOutlet],
  templateUrl: './exercise3.html',
  styleUrl: './exercise3.css',
})
export class Exercise3 implements OnInit {
  private httpClient = inject(HttpClient);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  currentTime = signal(Date.now());

  transactions = signal<TransactionData[]>([]);

  sortType = signal<SortType>('label');
  sortDirection = signal<SortDirection>('asc');

  ngOnInit(): void {
    // Update current time every second
    interval(1000).subscribe({ next: () => this.currentTime.set(Date.now()) });

    // Fetch transactions list
    this.fetchTransactions();

    // Listen to query params for sort type/direction changes and sort accordingly
    const subscription = this.route.queryParams.subscribe({
      next: (params) => {
        this.sortType.set((params['sortType'] as SortType) || 'label');
        this.sortDirection.set((params['sortDirection'] as SortDirection) || 'asc');
        this.sortBy();
      },
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  /**
   * Fetch transactions from JSON file.
   * Convert the date string into a Date object, keep the rest of the properties as they are
   */
  private fetchTransactions() {
    const subscription = this.httpClient
      .get<TransactionData[]>('data/transactions.json')
      .pipe(
        map((data: TransactionData[]) =>
          data.map((transaction) => ({ ...transaction, date: new Date(transaction.date) })),
        ),
      )
      .subscribe({
        next: (transactions) => {
          this.transactions.set(transactions);
          this.sortBy();
        },
      });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  /**
   * Sort transactions by current sort type and direction
   */
  private sortBy() {
    // Sort the transactions
    // by type
    let sortedTransactions = [...this.transactions()].sort(this.getSortFnFromType(this.sortType()));
    // by direction
    if (this.sortDirection() === 'desc') {
      sortedTransactions.reverse();
    }
    // update transactions list
    this.transactions.update((transactions) => sortedTransactions);
  }

  private getSortFnFromType(
    sortType: SortType,
  ): (a: TransactionData, b: TransactionData) => number {
    switch (sortType) {
      case 'label':
        return (a, b) => (a.label > b.label ? 1 : -1);
      case 'amount':
        return (a, b) => a.amount - b.amount;
      case 'balance':
        return (a, b) => a.balance - b.balance;
      case 'date':
        return (a, b) => a.date.getTime() - b.date.getTime();
      default:
        return (a, b) => 0;
    }
  }

  onSort(sortType: SortType) {
    // if same sort type, user clicked two times on the same button, change sort direction
    if (this.sortType() === sortType) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortDirection.set('asc');
      this.sortType.set(sortType);
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sortType: this.sortType(), sortDirection: this.sortDirection() },
      queryParamsHandling: 'merge',
    });
  }

  onSelect(transactionId: string) {
    this.router.navigate(['/exercise3', 'transactions', transactionId], {
      queryParams: { sortType: this.sortType(), sortDirection: this.sortDirection() },
    });
  }
}
