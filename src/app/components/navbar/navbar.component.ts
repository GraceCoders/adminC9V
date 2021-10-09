import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    constructor(private userService: AppService, private router: Router) {}

    ngOnInit(){}

    logout(){
    //   var data = {};
    //  this.userService.logout(data).subscribe((data)=>{
    //    console.log("=== check resposne data from api ===",data);
    //    if(data.statusCode == 200 || data.statusCode == 400){
    //      console.log("===== token data in logout ====>>>>",localStorage.getItem('token'));
    //      localStorage.removeItem('token');
         this.router.navigate(['/']);
    //    }
    //  },
    //  (err)=>{
    //    console.log(err);
    //  })
    }

    editProfile(){
      this.router.navigate(['reset-password']);
    }
}
