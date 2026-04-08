import { Component, inject, Signal, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, RequiredValidator } from '@angular/forms';
import { Validators } from '@angular/forms';
import { OperationData } from './operation/operation.model';
import { Operation } from './operation/operation';
import { Operations } from './operations.service';

@Component({
  selector: 'app-exercise2',
  imports: [ReactiveFormsModule, Operation],
  templateUrl: './exercise2.html',
  styleUrl: './exercise2.css',
})
export class Exercise2 {
  operationsService = inject(Operations);
  form = new FormGroup({
    val1: new FormControl(0, Validators.required),
    val2: new FormControl(0, Validators.required),
    operator: new FormControl('+', Validators.required),
  });

  currentResult = signal<OperationData | undefined>(undefined);

  get history() {
    return this.operationsService.history;
  }

  onSubmit() {
    console.log('Form submitted with values:', this.form.value);
    console.log(this.form);
    let resultData: OperationData = {
      leftOperand: this.form.value.val1 || 0,
      rightOperand: this.form.value.val2 || 0,
      date: new Date(),
      operator: this.form.value.operator || '*',
      result: 0,
    };

    switch (this.form.value.operator) {
      case '+':
        resultData.result = resultData.leftOperand + resultData.rightOperand;
        break;
      case '-':
        resultData.result = resultData.leftOperand - resultData.rightOperand;
        break;
      case '*':
        resultData.result = resultData.leftOperand * resultData.rightOperand;
        break;
      case '/':
        resultData.result = resultData.leftOperand / resultData.rightOperand;
        break;
      default:
        console.error('Invalid operator in computation');
        break;
    }
    this.currentResult.set(resultData);
    this.operationsService.addOperation(resultData);
  }
}
