import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from '../app.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  ordersList = [{customerName:'Customer',customerMobile:'987654',items:[1,2,3],orderTotal:'20',deliveryFee:'300',orderStatus:'DELIVERED'},
  {customerName:'Customer',customerMobile:'987654',items:[1,2,3],orderTotal:'20',deliveryFee:'300',orderStatus:'PENDING'},
  {customerName:'Customer',customerMobile:'987654',items:[1,2,3],orderTotal:'20',deliveryFee:'300',orderStatus:'CANCELLED'}];
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
    text: '',
    startDate: new Date("2021-09-01"),
    endDate: new Date("2021-09-07"),
    orderType: '',
    status : ["PENDING",
    "ACCEPTED", 
    "REJECTED",
    "ONTHEWAY",
    "DELIVERED",
    "CANCELLED"],
  }
  where = {
    filter: '',
		limit: 10,
    page: 1,
    order: -1
	}

  orderStatus = '';

  isFilter:boolean = false;
  dateTimeExample = new Date();


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
    // this.getProviders(this.data);
  }

  // getProviders(data){
  //   this.spinner.show();
  //   this.userService.getOrdersListForAdmin(data).subscribe((data)=>{
  //     if(data.statusCode == 200){
  //       this.ordersList = data.data.orders;
  //       console.log("==list provuders =======",this.ordersList);
  //       this.total = data.data.total
  //     }
  //     this.spinner.hide();

  //   },
  //   (err)=>{
  //     console.log(err);
  //     this.spinner.hide();
  //   })
  // }

  editProvider(id){
    this.router.navigate(['order-details'], { queryParams: { providerId: id } });
  }

  deleteProvider(providerId, index) {
    var consent = confirm("Do you want to delete this provider ?");
    if (consent) {
      this.userService.deleteProvider({ providerId: providerId }).subscribe((data) => {
        if (data.statusCode == 200) {
          this.ordersList.splice(index, 1);
        }
      });
    }
  }

  viewOrder(id){
    this.router.navigate(['order-details'], { queryParams: { orderId: id } });
  }


  loadPage(page: number) {
   this.data.page = page;
  //  this.getProviders(this.data);
  }
  search(event){
    this.data. filter = event.target.value;
    // this.getProviders(this.data)
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

  showFilters(){
    this.isFilter = !this.isFilter;
  }

  filterData(){
    if((this.data.startDate && !this.data.endDate) || (!this.data.startDate && this.data.endDate)){
      alert('Please Select both start and end dates.');
    }
    if(this.orderStatus){
      this.data.status = [];
      this.data.status.push(this.orderStatus);
    }

    

    // this.getProviders(this.data);

  }

  ChangeOrderStatus(value,orderId,OrderTotal){
    debugger
    let reqObj = {
      userId:localStorage.userId,
      orderId:orderId,
      orderTotal:OrderTotal,
      status:value
    };
    this.userService.changeOrderStatus(reqObj).subscribe((data) => {
      if (data.statusCode == 200) {
        // this.getProviders(this.data);
      }
    });
  }

}
