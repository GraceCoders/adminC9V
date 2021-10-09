import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { ViewEventComponent } from './../../view-event/view-event.component';
import { ChartsModule } from 'ng2-charts';

import { EditUserComponent } from '../../edit-user/edit-user.component';
import { UsersListComponent } from '../../users-list/users-list.component';
import { ResetPasswordComponent } from '../../reset-password/reset-password.component';
import { VendorsListComponent } from '../../vendors-list/vendors-list.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgxSpinnerModule } from "ngx-spinner";
import { BsDatepickerModule } from 'ngx-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductsComponent } from '../../products/products.component';
import { ViewProductComponent } from '../../view-product/view-product.component';
import { DateTimePickerModule} from 'ngx-datetime-picker';
import { StoresListComponent } from '../../stores-list/stores-list.component';
import { AddstoreComponent } from '../../addstore/addstore.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { EditstoreComponent } from '../../editstore/editstore.component';
import { AdminHelpComponent } from '../../admin-help/admin-help.component';
import { RatingFeedbackComponent } from '../../rating-feedback/rating-feedback.component';
import { AdminOrderListComponent } from '../../admin-order-list/admin-order-list.component';
import { AdminNotificationsComponent } from '../../admin-notifications/admin-notifications.component';
 

@NgModule({
  imports: [
    CommonModule,
    AmazingTimePickerModule,
    RouterModule.forChild(AdminLayoutRoutes),
    NgMultiSelectDropDownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    FormsModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    CKEditorModule,
    DateTimePickerModule,
    NgbModule.forRoot(),
    GooglePlaceModule,
    ChartsModule
  ],
  declarations: [
    DashboardComponent,
    ViewEventComponent,
    ResetPasswordComponent,
    EditUserComponent,
    VendorsListComponent,
    UsersListComponent,
    ProductsComponent,
    ViewProductComponent,
    StoresListComponent,
    AddstoreComponent,
    EditstoreComponent,
    AdminHelpComponent,
    RatingFeedbackComponent,
    AdminOrderListComponent,
    AdminNotificationsComponent
  ]
})

export class AdminLayoutModule {}
