import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import {ActivatedRoute ,Router} from '@angular/router';
import { FormGroup,FormBuilder,FormControl , Validators} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  editUserProfileForm: FormGroup;
  submitted = false;
  user_id = "";
  user = {
    username:'',
    email: '',
    verify: '',
    status: ''
  }
  idProofImage:string;
  profileImage:string;
  constructor(private userService: AppService,private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute,private spinner: NgxSpinnerService) {
    this.editUserProfileForm = this.formBuilder.group({
      name: [{value : '' , disabled:true}],
      email: [{value : '' , disabled:true}],
      mobileNumber:[{value : '' , disabled:true}],
      createdAt:[{value : '' , disabled:true}],
      idProofImage:[{value : '' , disabled:true}],
      isLocationPermission:[{value : '' , disabled:true}],
      isOTPVerified:[{value : '' , disabled:true}],
      isBlocked:[{value : '' , disabled:true}],
      profileImage:[{value : '' , disabled:true}],
      dob:[{value : '' , disabled:true}]
  });
   }

  ngOnInit() {

    
    this.route.queryParams.subscribe((params) => {
      this.user_id = params.user_id;
      // this.editUserProfileForm.addControl('userId', new FormControl('', Validators.required));
      // this.editUserProfileForm.controls['userId'].setValue(this.user_id);
      var data = {
        userId: params.user_id
      }
      this.getUserData(data)
    });

  }
  get f() { return this.editUserProfileForm.controls; }

  getUserData(data){
    this.spinner.show();
    this.userService.getUser(data).subscribe((data)=>{
      debugger
       if(data.statusCode == 200){
        this.spinner.hide();
         this.editUserProfileForm.patchValue(data.data);
         this.idProofImage = data.data.idProofImage;
         this.profileImage = data.data.profileImage;
       }
    },
    (err)=>{
      this.spinner.hide();
      console.log(err);
    })
  }

  UpdateUserStatus() {
    debugger;
    let reqModel = {userId:this.user_id,status:!this.editUserProfileForm.value.isBlocked};
    this.spinner.show();
    this.userService.UpdateUserStatus(reqModel).subscribe((data) => {
      debugger
      if (data.statusCode == 200) {
        this.spinner.hide();
        this.getUserData({userId: this.user_id});
      }
    },
      (err) => {
        this.spinner.hide();
        console.log(err);
      })
  }

}
