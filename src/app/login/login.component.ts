import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import {AppService } from './../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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
      this.userService.login(data).subscribe((data)=>{
          console.log("===print login response data data ==",data);
        if(data.statusCode == 200){
          localStorage.setItem('email',data.data.email);
          localStorage.setItem('isLoad',"true");
          localStorage.setItem('userId',data.data._id);
          localStorage.setItem('token',data.data.token);
          this.router.navigate(['dashboard']);
        }else{
          this.error = true;
          this.spinner.hide();
        }
      })
  }


}
