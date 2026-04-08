import { UpperCasePipe } from '@angular/common';
import { Component, computed, effect, input, model, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-exercise1',
  imports: [ReactiveFormsModule, UpperCasePipe],
  templateUrl: './exercise1.html',
  styleUrl: './exercise1.css',
})
export class Exercise1 {
  form = new FormGroup({
    enteredName: new FormControl(''),
    font: new FormControl('Times New Roman'),
    size: new FormControl(16),
    alignment: new FormControl('left'),
  });
}
