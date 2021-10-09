import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreLayoutRoutes } from './store-layout.rounting';
import { CatagoryListComponent } from '../../catagory-list/catagory-list.component';
import { AddcatagoryComponent } from '../../addcatagory/addcatagory.component';
import { EditcatagoryComponent } from '../../editcatagory/editcatagory.component';
import { ColorlistComponent } from '../../colorlist/colorlist.component';
import { AddcolorComponent } from '../../addcolor/addcolor.component';
import { EditcolorComponent } from '../../editcolor/editcolor.component';
import { ProductListComponent } from '../../product-list/product-list.component';
import { AddproductComponent } from '../../addproduct/addproduct.component';
import { EditproductComponent } from '../../editproduct/editproduct.component';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { DateTimePickerModule } from 'ngx-datetime-picker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { DriverListComponent } from '../../driver-list/driver-list.component';
import { AddDriverComponent } from '../../add-driver/add-driver.component';
import { EditDriverComponent } from '../../edit-driver/edit-driver.component';
import { StoreDashboardComponent } from '../../store-dashboard/store-dashboard.component';
import { AddbannerComponent } from '../../addbanner/addbanner.component';
import { BannerlistComponent } from '../../bannerlist/bannerlist.component';
import { OrderListComponent } from '../../order-list/order-list.component';
import { OrderDetailsComponent } from '../../order-details/order-details.component';
import { StoreHelpComponent } from '../../store-help/store-help.component';
import { DriverOrdersComponent } from '../../driver-orders/driver-orders.component';
import { RatingFeedbackStoreComponent } from '../../rating-feedback-store/rating-feedback-store.component';
import { UpdateProductComponent } from '../../update-product/update-product.component';
import { ChartsModule } from 'ng2-charts';
import { StoreNotificationsComponent } from '../../store-notifications/store-notifications.component';



@NgModule({
  declarations: [
    // CatagoryListComponent
    CatagoryListComponent,
    AddcatagoryComponent,
    EditcatagoryComponent,
    ColorlistComponent,
    AddcolorComponent,
    EditcolorComponent,
    ProductListComponent,
    AddproductComponent,
    EditproductComponent,
    DriverListComponent,
    AddDriverComponent,
    EditDriverComponent,
    StoreDashboardComponent,
    AddbannerComponent,
    BannerlistComponent,
    OrderListComponent,
    OrderDetailsComponent,
    StoreHelpComponent,
    DriverOrdersComponent,
    RatingFeedbackStoreComponent,
    UpdateProductComponent,
    StoreNotificationsComponent
  ],
  imports: [
    CommonModule,
    AmazingTimePickerModule,
    RouterModule.forChild(StoreLayoutRoutes),
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
  ]
})
export class StoreLayoutModule { }
