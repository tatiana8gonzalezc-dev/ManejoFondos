import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home-component/home-component';
import { FundsComponent } from './pages/funds-component/funds-component';
import { RecordComponent } from './pages/record-component/record-component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'funds', component: FundsComponent },
    { path: 'record', component: RecordComponent }
];
