import { Injectable, signal } from '@angular/core';
import { OperationData } from './operation/operation.model';

@Injectable({
  providedIn: 'root',
})
export class Operations {
  history = signal<OperationData[]>([]);

  addOperation(operation: OperationData) {
    this.history.update((history) => [operation, ...history]);
    console.log(this.history());
  }
  deleteOperation(operationDate: Date) {
    console.log('Deleting' + operationDate);
    this.history.update((history) => history.filter((op) => op.date !== operationDate));
    console.log(this.history());
  }
}
