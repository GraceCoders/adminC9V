import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from '../app.service';

@Component({
  selector: 'app-editstore',
  templateUrl: './editstore.component.html',
  styleUrls: ['./editstore.component.scss']
})
export class EditstoreComponent implements OnInit {

  storeForm: FormGroup;
  submitted: boolean = false;
  @ViewChild('placesRef') placesRef: GooglePlaceDirective;
  options: any;
  lat: any;
  lng: any;
  lattitude: any;
  longitude: any;
  selectedaddress: any;
  city: any;
  address_zip: any;
  urls_storePhoto: any;
  formData = new FormData();
  storeId: any;
  changePassword:boolean = false;
  storeImage:any;
  message:string;

  constructor(public formBuilder: FormBuilder, private userService: AppService, private router: Router, private route: ActivatedRoute,private spinner: NgxSpinnerService) { }

  get c() { return this.storeForm.controls };

  ngOnInit() {
    this.storeForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: [''],
      city: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
      address: ['', [Validators.required]],
      storeImage: ['', [Validators.required]],
      deliveryFee:['']
    });

    this.route.queryParams.subscribe((params) => {
      this.storeId = params.store_id;
      this.storeForm.addControl('storeId', new FormControl('', Validators.required));
      this.storeForm.controls['storeId'].setValue(this.storeId);
      var data = {
        storeId: params.store_id
      }
      this.getStoreData(data);
    });
  }

  getStoreData(data) {
    this.spinner.show();
    this.userService.getStore(data).subscribe((data) => {
      this.spinner.hide();
      if (data.statusCode == 200) {
        this.storeForm.patchValue(data.data);

        this.lattitude = data.data.storeLocation.coordinates[0];
        this.longitude = data.data.storeLocation.coordinates[1];
        this.storeImage = data.data.storeImage;
      }
    },
      (err) => {
        this.spinner.hide();
        console.log(err);
      })
  }

  UpdateStore(): void {
    debugger;
    this.submitted = true;
    if (this.storeForm.valid) {
      this.formData.set("name", this.storeForm.value.name);
      this.formData.set("email", this.storeForm.value.email);
      this.formData.set("city", this.storeForm.value.city);
      if(this.storeForm.value.password){
        this.formData.set("password", this.storeForm.value.password);
      }
      this.formData.set("mobileNumber", this.storeForm.value.mobileNumber);
      this.formData.set("zipCode", this.storeForm.value.zipCode);
      this.formData.set("address", this.storeForm.value.address);
      this.formData.set("lat", this.lattitude);
      this.formData.set("lng", this.longitude);
      this.formData.set("deliveryFee", this.storeForm.value.deliveryFee);
      if(this.storeId){
        this.formData.set("storeId",this.storeId);
      }
      this.spinner.show();
      this.userService.updateStore(this.formData).subscribe((data) => {
        this.spinner.hide();
        if (data.statusCode == 200) {
          this.router.navigate(['stores']);
          this.message = "";
        }
        else {
          this.message = data.message;
        }
      },
        (err) => {
          this.spinner.hide();
          console.log(err);
        })
    }
  }
  Cancel(): void {
    this.submitted = false;
    this.storeForm.reset();
    this.router.navigate(['stores']);
  }

  handleAddressChange(address: Address) {
    this.lat = address.geometry.location.lat();
    this.lng = address.geometry.location.lng();

    this.lattitude = this.lat;
    this.longitude = this.lng;

    this.selectedaddress = address.formatted_address;
    if (address.address_components.length === 0) {
      return false;
    }
    for (const element of address.address_components) {
      if (element['types'].indexOf('city') > -1) {
        this.city = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('administrative_area_level_2') > -1) {
        this.city = element['long_name'];
        continue;
      }


      if (element['types'].indexOf('postal_code') > -1) {
        if (element['long_name'] && (element['long_name'] != 'undefined')) {

          this.address_zip = element['long_name'];
          continue;
        } else {
          this.address_zip = '';
        }

      } else {
        this.address_zip = '';
      }
    }
    this.storeForm.controls['address'].setValue(this.selectedaddress);
    this.storeForm.controls['city'].setValue(this.city);


    this.storeForm.controls['zipCode'].setValue(this.address_zip);
  }

  fileUploadCoverPhoto(event) {
    let files = event.target.files;
    this.urls_storePhoto = [];
    if (files) {
      for (let file of files) {
        var ext = file.name.match(/\.(.+)$/)[1];
        if (ext.toLowerCase() === 'jpg' ||
          ext.toLowerCase() === 'jpeg' ||
          ext.toLowerCase() === 'png' ||
          ext.toLowerCase() === 'webp') {
          let reader = new FileReader();
          reader.onload = (e: any) => {
            this.urls_storePhoto.push(e.target.result);
          }
          reader.readAsDataURL(file);
          this.formData.set('storeImage', file, file.name);
          this.storeImage = null;
          this.storeForm.controls["storeImage"].setValue(this.formData.get('storeImage'));
        }
      }
    }
  }

  passwordChangeOption(value){
    debugger;
    this.changePassword = value;
  }

}
