import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete/ngx-google-places-autocomplete.directive';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from '../app.service';

@Component({
  selector: 'app-edit-driver',
  templateUrl: './edit-driver.component.html',
  styleUrls: ['./edit-driver.component.scss']
})
export class EditDriverComponent implements OnInit {

  driverForm: FormGroup;
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
  driverId: any;
  changePassword:boolean = false;
  storeImage:any;

  constructor(public formBuilder: FormBuilder, private userService: AppService, private router: Router, private route: ActivatedRoute,private spinner: NgxSpinnerService) { }

  get c() { return this.driverForm.controls };

  ngOnInit() {
    this.driverForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required]],
      password:['',[Validators.required]],
      address:['',[Validators.required]],
      storeId:[localStorage.storeId]
    });

    this.route.queryParams.subscribe((params) => {
      this.driverId = params.driver_id;
      this.driverForm.addControl('driverId', new FormControl('', Validators.required));
      this.driverForm.controls['driverId'].setValue(this.driverId);
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
        this.driverForm.patchValue(data.data);

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
    this.submitted = true;
    if (this.driverForm.valid) {
      this.formData.set("name", this.driverForm.value.name);
      this.formData.set("email", this.driverForm.value.email);
      this.formData.set("city", this.driverForm.value.city);
      if(this.driverForm.value.password){
        this.formData.set("password", this.driverForm.value.password);
      }
      this.formData.set("mobileNumber", this.driverForm.value.mobileNumber);
      this.formData.set("zipCode", this.driverForm.value.zipCode);
      this.formData.set("address", this.driverForm.value.address);
      this.formData.set("lat", this.lattitude);
      this.formData.set("lng", this.longitude);
      if(this.driverId){
        this.formData.set("driverId",this.driverId);
      }
      this.spinner.show();
      this.userService.updateStore(this.formData).subscribe((data) => {
        this.spinner.hide();
        if (data.statusCode == 200) {
          this.router.navigate(['stores']);
        }
        else {

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
    this.driverForm.reset();
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
    this.driverForm.controls['address'].setValue(this.selectedaddress);
    this.driverForm.controls['city'].setValue(this.city);


    this.driverForm.controls['zipCode'].setValue(this.address_zip);
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
          this.driverForm.controls["storeImage"].setValue(this.formData.get('storeImage'));
        }
      }
    }
  }

  passwordChangeOption(value){
    debugger;
    this.changePassword = value;
  }

}
