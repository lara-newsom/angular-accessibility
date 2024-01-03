import { Routes } from '@angular/router';
import { ROUTE_TOKENS } from './models/route-tokens';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  {
    path: ROUTE_TOKENS.products,
    loadChildren: () => import('./product-view/product-view.routes').then(m => m.ROUTES),
  },
  {
    path: '',
    redirectTo: ROUTE_TOKENS.home,
    pathMatch: 'full',
  },
  {
    path: ROUTE_TOKENS.home,
    component: HomeComponent,
  },
  {
    path: ROUTE_TOKENS.contact,
    loadChildren: () => import('./contact/contact-routes').then(m => m.CONTACT_ROUTES),
  },
  {
    path: ROUTE_TOKENS.cart,
    loadComponent: () => import('./cart/cart.component').then(m => m.CartComponent),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
