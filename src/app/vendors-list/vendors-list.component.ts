
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vendors-list',
  templateUrl: './vendors-list.component.html',
  styleUrls: ['./vendors-list.component.scss']
})
export class VendorsListComponent implements OnInit {
  providers = [];
  registerForm: FormGroup;
  submitted = false;
  errMssage = false;
  msg = ""

 size = ''
 pagination = false;
 total = 0;
  data = {
    page : 1,
    limit: '',
    filter: '',
    text: ''
  }
  where = {
    filter: '',
		limit: 10,
    page: 1,
    order: -1
	}

  constructor( 
               private formBuilder: FormBuilder,
               private router: Router, 
               private userService: AppService,
               private spinner: NgxSpinnerService) { }

  ngAfterViewInit() {
    // Hack: Scrolls to top of Page after page view initialized
    let top = document.getElementById('top');
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      timezone:["Asia/Kolkata"],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address:['',Validators.required]
  });
    this.getProviders(this.data);
  }

  getProviders(data){
    this.spinner.show();
    this.userService.getProviders(data).subscribe((data)=>{
      if(data.statusCode == 200){
        this.providers = data.data.vendors;
        console.log("==list provuders =======",this.providers);
        this.total = data.data.total
        this.spinner.hide();
      }
    },
    (err)=>{
      console.log(err);
      this.spinner.hide();
    })
  }

  editProvider(id){
    this.router.navigate(['edit-vendor'], { queryParams: { providerId: id } });
  }

  deleteProvider(providerId,index){
    var consent = confirm("Do you want to delete this provider ?");
    if(consent){
    this.userService.deleteProvider({ providerId:providerId}).subscribe((data)=>{
      if(data.statusCode == 200){
        this.providers.splice(index,1);
      }
    })
    }
  }

  viewVendor(id){
    this.router.navigate(['view-event'], { queryParams: { vendorId: id } });
  }


  loadPage(page: number) {
   this.data.page = page;
   this.getProviders(this.data);
  }
  search(event){
    this.data. filter = event.target.value;
    this.getProviders(this.data)
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;
      console.log("===chekc enkkggg",this.registerForm.value)
      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }
      this.errMssage = false;
      this.spinner.show();
      this.userService.addProvider(this.registerForm.value).subscribe((data)=>{
        console.log("=== resposnse of daat data====",data)
        if(data.statusCode == 200){
          window.location.reload();
        }
        if(data.statusCode == 400){
          this.spinner.hide();
          this.errMssage = true;
          this.msg = data.message;
        }
      },
      (err)=>{
        console.log(err);
        this.spinner.hide();
      })

  }
}
