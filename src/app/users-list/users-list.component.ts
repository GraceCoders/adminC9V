import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
 
  users = [];
  size = '';
  pagination = false;
  total = 0;
   data = {
     page : 1,
     limit: '',
     text: '',
     filter: ''
   }
   where = {
     filter: '',
     limit: 10,
     page: 1,
     order: -1
   }

  constructor(private router: Router, private userService: AppService,private spinner: NgxSpinnerService) { }

  ngAfterViewInit() {
    // Hack: Scrolls to top of Page after page view initialized
    let top = document.getElementById('top');
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    }
  }
  ngOnInit() {
    this.getUsers(this.data);
  }

  getUsers(data){
    this.spinner.show();
    this.userService.getUsers(data).subscribe((data)=>{
      if(data.statusCode == 200){
        this.users = data.data.users;
        this.total = data.data.total;
        this.spinner.hide();
      }
    },
    (err)=>{
      console.log(err);
      this.spinner.hide();
    })
  }


  deleteUser(user_id,index){
    
    var consent = confirm("Do you want to delete this user ?");
    if(consent){
    this.userService.deleteUser({userId: user_id}).subscribe((data)=>{
      if(data.statusCode == 200){
        this.users.splice(index,1);
      }

    })
    }
  }

  loadPage(page: number) {
    this.data.page = page;
    this.getUsers(this.data);
   }

   search(event){
     this.data.filter = event.target.value;
     this.getUsers(this.data)
   }

   editUser(user_id){
     this.router.navigate(['edit-user'], { queryParams: { user_id: user_id}});
   }

}
