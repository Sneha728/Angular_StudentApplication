import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { AddStudent } from './components/add-student/add-student';

export const routes: Routes = [
    {path : 'home',component : Home},
    {path : 'add-student',component : AddStudent},
    { path: '', redirectTo: '/home', pathMatch: 'full' },
];
