import { Routes } from '@angular/router';
import { routes as exercise3Routes } from './exercises/exercise3/exercise3.routes';
import { Exercise3 } from './exercises/exercise3/exercise3';
import { Exercise1 } from './exercises/exercise1/exercise1';
import { Exercise2 } from './exercises/exercise2/exercise2';
export const routes: Routes = [
  {
    path: 'exercise1',
    component: Exercise1,
  },
  {
    path: 'exercise2',
    component: Exercise2,
  },
  {
    path: 'exercise3',
    component: Exercise3,
    children: exercise3Routes,
  },
];
