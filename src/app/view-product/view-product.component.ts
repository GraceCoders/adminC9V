import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AppService } from '../app.service';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {
  product;
  public Editor = ClassicEditor;
  editProductForm: FormGroup;
  selectedDate = new Date();
  errMessage = false;
  isImageOne = false;
  isImageTwo = false;
  msg = "";
  submitted = false;
  coverimage = false;
  image = false;
  type;
  normal = false;
  auction = false;

  coverimage_error_msg = '';
  urls_imageTwo =[];
  urls_imageOne = [];
  image_error_msg = '';
  error_msg = '';
  error = false;
  formData = new FormData();
  addProductForm: FormGroup;
  dateTimeExample = new Date();

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
     private router: Router, 
     private userService: AppService,
     private spinner: NgxSpinnerService
     ) { }

     ngAfterViewInit() {
      let top = document.getElementById('top');
      if (top !== null) {
        top.scrollIntoView();
        top = null;
      }
    }

  ngOnInit() {
    this.editProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      size: ['', Validators.required],
      address: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.route.queryParams.subscribe(params => {
      this.userService.getProductById({productId:params.productId}).subscribe((data)=>{
        this.spinner.show();
        if(data.statusCode == 200){
          this.product= data.data;
          this.type = params.type;
          this.urls_imageTwo = [];
          this.urls_imageTwo.push(data.data.imageTwo);
          this.urls_imageOne = [];
          this.urls_imageOne.push(data.data.imageOne);
          this.editProductForm.patchValue(data.data);
          if(this.type == "normal"){
            this.auction = false;
          }else{
            this.auction = true
          }
          this.spinner.hide();
        }
      },
      (err)=>{
       console.log(err);
       this.spinner.hide();
      })
    });
  }
  
  fileUploadImageTwo(event) {
    let files = event.target.files;
    this.isImageTwo = true;
    this.urls_imageTwo = [];
    if (files) {
      for (let file of files) {
        var ext = file.name.match(/\.(.+)$/)[1];
        if (ext.toLowerCase() === 'jpg' ||
          ext.toLowerCase() === 'jpeg' ||
          ext.toLowerCase() === 'png' ||
          ext.toLowerCase() === 'webp') {
            let reader = new FileReader();
            reader.onload = (e: any) => {
              this.urls_imageTwo.push(e.target.result);
            }
            reader.readAsDataURL(file);
          this.formData.set('imageTwo', file, file.name);
          // this.formData.append('coverPhoto', file,file.name);
        }

      }
    }else{
      this.urls_imageTwo.push('../../assets/img/4-3.png');
    }

  }


  fileUploadImageOne(event) {
    let files = event.target.files;
    this.isImageOne = true;
    this.urls_imageOne = [];
    if (files) {
      for (let file of files) {
        var ext = file.name.match(/\.(.+)$/)[1];
        if (ext.toLowerCase() === 'jpg' ||
          ext.toLowerCase() === 'jpeg' ||
          ext.toLowerCase() === 'png' ||
          ext.toLowerCase() === 'webp') {
            let reader = new FileReader();
            reader.onload = (e: any) => {
              this.urls_imageOne.push(e.target.result);
            }
            reader.readAsDataURL(file);
          this.formData.set('imageOne', file, file.name);
        }

      }
    }else{
      this.urls_imageOne.push('../../assets/img/4-3.png');
    }

  }

  normalProduct(p,v,d,pd,o){
    let timezone = "Asia/kolkata";
    var scheduleDate = moment(new Date(),timezone).format('DD-MM-YYYY');
    var scheduleTime = moment(new Date(),timezone).format('hh:mm A')

    if(o == "YES"){
      this.errMessage = true;
      this.msg = "Product is already placed";
      return
    }

    var data = {
      productId: p,
      vendorId: v,
      status: "ORDER",
      scheduleDate:scheduleDate,
      scheduleTime: scheduleTime,
      description: pd
    }
    if (d && d.editorInstance){
      data.description = d.editorInstance.getData()
    }

    this.userService.addAuctionProduct(data).subscribe((data)=>{
      this.spinner.show();
      if(data.statusCode == 200){
        this.product= data.data;
        this.spinner.hide();
        this.router.navigate(['products'],{ queryParams: { vendorId: v } });
        
      }
    },
    (err)=>{
     console.log(err);
     this.spinner.hide();
    })

  }

  auctionProduct(p,v,r,d,pd,o){
    let timezone = "Asia/kolkata";
    var scheduleDate = moment(r.selectedDateTime,timezone).format('DD-MM-YYYY');
    var scheduleTime = moment(r.selectedDateTime,timezone).format('hh:mm A')
    var selectedDate = moment(r.selectedDateTime,timezone).format();
    var currentDate = moment(new Date(), timezone).format();

    var difference = moment(selectedDate).diff(moment(currentDate), 'minutes');
    this.errMessage = false;
    if(difference < 60){
      this.errMessage = true;
      this.msg = "Schedule  date time must be 1 hour more"
      return
    }
    if(difference  == 0){
      this.errMessage = true;
      this.msg = "Please select schedule date and time"
      return
    }
    if(o == "YES"){
      this.errMessage = true;
      this.msg = "Product is already placed";
      return
    }
    var data = {
      productId: p,
      vendorId: v,
      scheduleDate: scheduleDate,
      scheduleTime: scheduleTime,
      status: "AUCTION",
      description: pd
    }
    if (d && d.editorInstance){
      data.description = d.editorInstance.getData()
    }

    this.userService.addAuctionProduct(data).subscribe((data)=>{
      if(data.statusCode == 200){
        this.product= data.data;
        this.router.navigate(['products'],{ queryParams: { vendorId: v } });
        
      }
    },
    (err)=>{
     console.log(err);
    })

  }

}
