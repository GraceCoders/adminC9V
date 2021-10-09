import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from '../app.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  msgError = false;
  msg = "";

  constructor(private router: Router, private userService: AppService,private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }

  changePassword(password,confirm_password){

    if(password.value == "" || confirm_password == ""){
       this.msgError = true;
       this.msg = "Please fill required field.";
       return;
    }
    if(password.value !== confirm_password.value){
     this.msgError = true;
     this.msg = "Password is not matching.";
     return;
    }
    if(password.value.length < 6){
      this.msgError = true;
      this.msg = "Password must be length of 6 character.";
      return;
     }
    else{
      var data = {
        user_id: localStorage.getItem('user_id'),
        password: password.value,

      }
      this.spinner.show();
      this.userService.changePassword(data).subscribe((data)=>{
        this.spinner.hide();
        if(data.statusCode == 200){
          this.router.navigate(['dashboard']);
        } 
      },
      (err)=>{
        this.spinner.hide();
      console.log(err);
      })
    }

  }
}
