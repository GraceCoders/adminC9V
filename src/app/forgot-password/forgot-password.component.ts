import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from '../app.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  constructor(private router: Router, private userService: AppService,private spinner: NgxSpinnerService) { }

  error = false;
  msgError = false;
  msg = "";
  ngOnInit() {
  }

  forgotPassword(email){
    console.log("==== get email value from forgot password ====", email);
    if(email.value == ''){
      this.msgError = true;
      this.msg = "Please enter email."
    }else{
      var data = {
        email: email.value
      }
      this.spinner.show();
      this.userService.forgotPassword(data).subscribe((data)=>{
        this.spinner.hide();
          if(data.status == 200){
            console.log("==== check email is exists or not ====>>>>",data);
            localStorage.setItem('admin-email',data.data[0].email);
            this.router.navigate(['change-password']);
          }
      },
      (err)=>{
        this.spinner.hide();
       console.log(err);
      })
    }
  }
}
