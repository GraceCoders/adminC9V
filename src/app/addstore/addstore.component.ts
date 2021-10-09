import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from '../app.service';

@Component({
  selector: 'app-addstore',
  templateUrl: './addstore.component.html',
  styleUrls: ['./addstore.component.scss']
})
export class AddstoreComponent implements OnInit {

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
  urls_coverPhoto: any;
  formData = new FormData();
  message:string;


  constructor(public formBuilder: FormBuilder, private userService: AppService, private router: Router,private spinner: NgxSpinnerService) { }

  get c() { return this.storeForm.controls };

  ngOnInit() {
    this.storeForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      city: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
      address: ['', [Validators.required]],
      storeImage: ['', [Validators.required]],
      deliveryFee:['']
    });
  }

  SaveStore(): void {
    this.submitted = true;
    if (this.storeForm.valid) {
      this.formData.set("name", this.storeForm.value.name);
      this.formData.set("email", this.storeForm.value.email);
      this.formData.set("city", this.storeForm.value.city);
      this.formData.set("password", this.storeForm.value.password);
      this.formData.set("mobileNumber", this.storeForm.value.mobileNumber);
      this.formData.set("zipCode", this.storeForm.value.zipCode);
      this.formData.set("address", this.storeForm.value.address);
      this.formData.set("deliveryFee", this.storeForm.value.deliveryFee);
      this.formData.set("lat", this.lattitude);
      this.formData.set("lng", this.longitude);
      this.spinner.show();
      this.userService.addStore(this.formData).subscribe((data) => {
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
    this.urls_coverPhoto = [];
    if (files) {
      for (let file of files) {
        var ext = file.name.match(/\.(.+)$/)[1];
        if (ext.toLowerCase() === 'jpg' ||
          ext.toLowerCase() === 'jpeg' ||
          ext.toLowerCase() === 'png' ||
          ext.toLowerCase() === 'webp') {
          let reader = new FileReader();
          reader.onload = (e: any) => {
            this.urls_coverPhoto.push(e.target.result);
          }
          reader.readAsDataURL(file);
          this.formData.set('storeImage', file, file.name);
          this.storeForm.controls["storeImage"].setValue(this.formData.get('storeImage'));
        }
      }
    }
  }
}
