import { Component, signal } from '@angular/core';
import { Exercise1 } from './exercises/exercise1/exercise1';
import { Exercise2 } from './exercises/exercise2/exercise2';

@Component({
  selector: 'app-root',
  imports: [Exercise1, Exercise2],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('angular-project');
}
