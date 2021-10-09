import { Routes } from "@angular/router";
import { AddcatagoryComponent } from "../../addcatagory/addcatagory.component";
import { AddcolorComponent } from "../../addcolor/addcolor.component";
import { AddproductComponent } from "../../addproduct/addproduct.component";
import { ColorlistComponent } from "../../colorlist/colorlist.component";
import { EditcatagoryComponent } from "../../editcatagory/editcatagory.component";
import { EditcolorComponent } from "../../editcolor/editcolor.component";
import { EditproductComponent } from "../../editproduct/editproduct.component";
import { ProductListComponent } from "../../product-list/product-list.component";
import { CatagoryListComponent } from "../../catagory-list/catagory-list.component";
import { DriverListComponent } from "../../driver-list/driver-list.component";
import { AddDriverComponent } from "../../add-driver/add-driver.component";
import { EditDriverComponent } from "../../edit-driver/edit-driver.component";
import { StoreDashboardComponent } from "../../store-dashboard/store-dashboard.component";
import { AddbannerComponent } from "../../addbanner/addbanner.component";
import { BannerlistComponent } from "../../bannerlist/bannerlist.component";
import { OrderListComponent } from "../../order-list/order-list.component";
import { OrderDetailsComponent } from "../../order-details/order-details.component";
import { StoreHelpComponent } from "../../store-help/store-help.component";
import { DriverOrdersComponent } from "../../driver-orders/driver-orders.component";
import { RatingFeedbackStoreComponent } from "../../rating-feedback-store/rating-feedback-store.component";
import { UpdateProductComponent } from "../../update-product/update-product.component";
import { StoreNotificationsComponent } from "../../store-notifications/store-notifications.component";
export const StoreLayoutRoutes: Routes = [
    { path: 'catagory-list',      component: CatagoryListComponent},
    { path: 'color-list',      component: ColorlistComponent},
    { path: 'product-list',      component: ProductListComponent},
    { path: 'add-catagory',      component: AddcatagoryComponent},
    { path: 'add-color',      component: AddcolorComponent},
    { path: 'add-product',      component: AddproductComponent},
    { path: 'edit-catagory',      component: EditcatagoryComponent},
    { path: 'edit-color',      component: EditcolorComponent},
    { path: 'edit-product',      component: EditproductComponent},
    {path: 'driver-list',   component:DriverListComponent},
    {path:'add-driver',     component:AddDriverComponent},
    {path:'edit-driver',    component:EditDriverComponent},
    {path:'store-dashboard',component:StoreDashboardComponent},
    {path:'banner-list',component:BannerlistComponent},
    {path:'add-banner',component:AddbannerComponent},
    {path:"order-list",component:OrderListComponent},
    {path:'store-help',component:StoreHelpComponent},
    {path:'driver-orders',component:DriverOrdersComponent},
    {path:"order-details",component:OrderDetailsComponent},
    {path:"rating-feedback-store",component:RatingFeedbackStoreComponent},
    {path:"update-product",component:UpdateProductComponent},
    {path:'store-notifications',component:StoreNotificationsComponent}
]