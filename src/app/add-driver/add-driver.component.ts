import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { AppService } from '../app.service';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.scss']
})
export class AddDriverComponent implements OnInit {

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
  urls_coverPhoto: any;
  formData = new FormData();


  constructor(public formBuilder: FormBuilder, private userService: AppService, private router: Router) { }

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
  }

  SaveDriver(): void {
    this.submitted = true;
    if (this.driverForm.valid) {
      console.log
      this.userService.addDriver(this.driverForm.value).subscribe((data) => {
        if (data.statusCode == 200) {

          this.router.navigate(['driver-list']);
        }
        else {

        }
      },
        (err) => {
          console.log(err);
        })
    }
  }
  Cancel(): void {
    this.submitted = false;
    this.driverForm.reset();
    this.router.navigate(['driver-list']);
  }

}
