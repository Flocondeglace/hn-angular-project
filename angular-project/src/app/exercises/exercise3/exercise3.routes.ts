import { Routes } from '@angular/router';
import { TransactionDescription } from './transaction/transaction-description/transaction-description';
import { NoTransactionDescription } from './transaction/no-transaction-description/no-transaction-description';

export const routes: Routes = [
  {
    path: 'transactions/:transactionId',
    component: TransactionDescription,
  },
  // Fallback route
  {
    path: '',
    component: NoTransactionDescription,
  },
];
