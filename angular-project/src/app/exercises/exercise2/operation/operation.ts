import { Component, inject, input } from '@angular/core';
import { type OperationData } from './operation.model';
import { DatePipe } from '@angular/common';
import { Operations } from '../operations.service';

@Component({
  selector: 'tr[app-operation]',
  imports: [DatePipe],
  templateUrl: './operation.html',
  styleUrl: './operation.css',
})
export class Operation {
  operationsService = inject(Operations);
  operation = input.required<OperationData>();

  onDeleteOperation() {
    this.operationsService.deleteOperation(this.operation().date);
  }
}
