import { Routes } from '@angular/router';
import {PagesComponent} from '../app/pages/pages.component'
export const routes: Routes = [
    { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: 'browse-page/:page', component:PagesComponent}
];
