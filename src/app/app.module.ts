import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuardService } from "./guards/auth-guard.service";
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { ComponentsModule } from './components/components.module';
import { AppService} from './app.service';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LoginasComponent } from './loginas/loginas.component';
import { LoginStoreComponent } from './login-store/login-store.component';
import { StoreLayoutComponent } from './layouts/store-layout/store-layout.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    ComponentsModule,
    NgxSpinnerModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    CKEditorModule,
    FormsModule, 
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    LoginasComponent,
    LoginStoreComponent,
    StoreLayoutComponent
  ],
  providers: [AppService,AuthGuardService],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
