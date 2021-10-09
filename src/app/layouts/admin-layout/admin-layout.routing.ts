import { Routes } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { ResetPasswordComponent } from '../../reset-password/reset-password.component';
import { EditUserComponent } from '../../edit-user/edit-user.component';
import { ViewEventComponent } from '../../view-event/view-event.component';
import { VendorsListComponent } from '../../vendors-list/vendors-list.component';
import { UsersListComponent } from '../../users-list/users-list.component';
import { AuthGuardService } from '../../guards/auth-guard.service';
import { ProductsComponent } from '../../products/products.component';
import { ViewProductComponent } from '../../view-product/view-product.component';
import { StoresListComponent } from '../../stores-list/stores-list.component';
import { AddstoreComponent } from '../../addstore/addstore.component';
import { EditstoreComponent } from '../../editstore/editstore.component';
import { AdminHelpComponent } from '../../admin-help/admin-help.component';
import { RatingFeedbackComponent } from '../../rating-feedback/rating-feedback.component';
import { AdminOrderListComponent } from '../../admin-order-list/admin-order-list.component';
import { AdminNotificationsComponent } from '../../admin-notifications/admin-notifications.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent ,canActivate: [AuthGuardService]},
    { path: 'reset-password', component: ResetPasswordComponent, canActivate:[AuthGuardService]},
    { path: 'users',          component: UsersListComponent, canActivate:[AuthGuardService]},
    { path: 'edit-user',      component:EditUserComponent, canActivate:[AuthGuardService]},
    { path: 'view-event',     component: ViewEventComponent, canActivate:[AuthGuardService]},  
    { path: 'providers', component: VendorsListComponent, canActivate:[AuthGuardService]}, 
    { path: 'products', component: ProductsComponent, canActivate:[AuthGuardService]},
    { path: 'view-product',      component: ViewProductComponent,canActivate:[AuthGuardService]},
    {path: 'stores',    component:StoresListComponent,canActivate:[AuthGuardService]},
    {path: 'addStore',  component:AddstoreComponent,canActivate:[AuthGuardService]},
    {path: 'editStore',  component:EditstoreComponent,canActivate:[AuthGuardService]},
    {path: 'admin-help',    component:AdminHelpComponent, canActivate:[AuthGuardService]},
    {path:'rating-feedback',component:RatingFeedbackComponent,canActivate:[AuthGuardService]},
    {path:'admin-order-list',component:AdminOrderListComponent,canActivate:[AuthGuardService]},
    {path:'admin-notifications',component:AdminNotificationsComponent,canActivate:[AuthGuardService]}
    // { path: '**',redirectTo: ''}
];


