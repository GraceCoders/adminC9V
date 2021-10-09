import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login-store',
  templateUrl: './login-store.component.html',
  styleUrls: ['./login-store.component.scss']
})
export class LoginStoreComponent implements OnInit {

  login = {
		'email': '',
		'password': ''
	}

  error = false
  msg="";

  constructor(
    private router: Router, 
    private userService: AppService,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit() {
    this.spinner.hide();
  }

  doLogin() {
    this.spinner.show();
    console.log("=== 0000000 =======");
    if (!this.login.email || !this.login.password) {
      console.log("=== 11111111111 =======");
			return
    }
    var data = {
      email: this.login.email,
      password: this.login.password
    }
    console.log("=== 222222222 =======");
      this.userService.loginStore(data).subscribe((data)=>{
          console.log("===print login response data data ==",data);
        if(data.statusCode == 200){
          debugger;
          localStorage.setItem('email',data.data.email);
          localStorage.setItem('isLoad',"true");
          localStorage.setItem('storeId',data.data._id);
          localStorage.setItem('token',data.data.token);
          localStorage.setItem('storename',data.data.name);
          this.router.navigate(['store-dashboard']);
        }else{
          this.error = true;
          this.spinner.hide();
        }
      })
  }

}
