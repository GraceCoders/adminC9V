import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from '../app.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  editProductForm: FormGroup;
  event_id;
  tickets = [];
  details = {
    orderStatus:'REJECTED',
    createdAt:new Date(),
    orderTotal:89,
    billingDetails:{
      houseNo:1,
      street:'main rd',
      pinCode:151001,
      townCity:'Bathinda',
      state:'Punjab'
    },
    transactionId:'05ASF34BF9',
    customerName:'Sandeep',
    customerEmail:'deepdeid@gmail.com',
    customerMobile:9815498454,
    items:[
      {price:20,quantity:5,cleaningFish:10,vendorId :{name:'fisherman',address:'huwaii'}},
      {price:20,quantity:5,cleaningFish:10,vendorId :{name:'fisherman',address:'huwaii'}},
      {price:20,quantity:5,cleaningFish:10,vendorId :{name:'fisherman',address:'huwaii'}},
    ]
  };
  formData = new FormData();
  isImageOne = false;
  isImageTwo = false;
  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private spinner: NgxSpinnerService,
    private userService: AppService) { }

  ngOnInit() {
    // this.spinner.show();
    // this.route.queryParams.subscribe(params => { 
    //   this.userService.getAdminProductDetail({orderId:params.orderId}).subscribe((data)=>{
    //     debugger
    //     if(data.statusCode == 200){
    //       this.details = data.data;
          
    //     }
    //     this.spinner.hide();
    //   },
    //   (err)=>{
    //    console.log(err);
    //    this.spinner.hide();
    //   })
    // });
  }
  
  allProducts(vendorId){
    this.router.navigate(['products'], { queryParams: { vendorId: vendorId } });
  }

}
