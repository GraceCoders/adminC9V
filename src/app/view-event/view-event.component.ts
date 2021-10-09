import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AppService } from '../app.service';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.scss']
})
export class ViewEventComponent implements OnInit {
  editProductForm: FormGroup;
  event_id;
  tickets = [];
  vendor;
  formData = new FormData();
  isImageOne = false;
  isImageTwo = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute, 
    private router: Router, 
    private userService: AppService) { }

  ngOnInit() {
    
    this.editProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      contactNumber: ['', Validators.required],
      openingHour: ['', Validators.required],
      photo: [''],
      coverPhoto: [''],
      url: ['', Validators.required],
      type: ['', Validators.required],
      openingDay: ['', Validators.required],
      closingDay: [''],
      dealId: [''],
      description: ['', Validators.required],
      category: ['', Validators.required]
    });

    this.route.queryParams.subscribe(params => {
      this.userService.getVendorById({vendorId:params.vendorId}).subscribe((data)=>{
        if(data.statusCode == 200){
          this.vendor = data.data;
        }
      },
      (err)=>{
       console.log(err);
      })
    });
  }
  
  fileUploadImageOne(event) {
    let files = event.target.files;
    this.isImageOne = true;
    if (files) {
      for (let file of files) {
        var ext = file.name.match(/\.(.+)$/)[1];
        if (ext.toLowerCase() === 'jpg' ||
          ext.toLowerCase() === 'jpeg' ||
          ext.toLowerCase() === 'png' ||
          ext.toLowerCase() === 'webp') {
          this.formData.set('imageOne', file, file.name);
        }

      }
    }

  }


  fileUploadImageTwo(event) {
    let files = event.target.files;
    this.isImageTwo = true;
    console.log("===== event ===", event.target.files);
    if (files) {
      for (let file of files) {
        var ext = file.name.match(/\.(.+)$/)[1];
        if (ext.toLowerCase() === 'jpg' ||
          ext.toLowerCase() === 'jpeg' ||
          ext.toLowerCase() === 'png' ||
          ext.toLowerCase() === 'webp') {
          this.formData.set('imageTwo', file, file.name);
        }

      }
    }

  }

  get f() { return this.editProductForm.controls; }

  allProducts(vendorId){
    this.router.navigate(['products'], { queryParams: { vendorId: vendorId } });
  }

}
