import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LoginasComponent } from './loginas/loginas.component';
import { LoginStoreComponent } from './login-store/login-store.component';
import { StoreLayoutComponent } from './layouts/store-layout/store-layout.component';

const routes: Routes = [
  {
    path: '',
    component: LoginasComponent
  },
  {
    path: 'login-admin',
    component: LoginComponent
  },
  {
    path: 'login-store',
    component: LoginStoreComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent
  },
  // {
  //   path: 'catagory-list',
  //   component: CatagoryListComponent
  // },

  // {
  //   path: 'add-catagory',
  //   component: AddcatagoryComponent
  // },
  // {
  //   path: 'edit-catagory',
  //   component: EditcatagoryComponent
  // },
  // {
  //   path: 'color-list',
  //   component: ColorlistComponent
  // },
  // {
  //   path: 'add-color',
  //   component: AddcolorComponent
  // },
  // {
  //   path: 'edit-color',
  //   component: EditcolorComponent
  // },
  // {
  //   path: 'product-list',
  //   component: ProductListComponent
  // },
  // {
  //   path: 'add-product',
  //   component: AddproductComponent
  // },
  // {
  //   path: 'add-product',
  //   component: EditproductComponent
  // },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      }]
  },
  {
    path: '',
    component: StoreLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/store-layout/store-layout.module#StoreLayoutModule'
      }]
  },
 
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
