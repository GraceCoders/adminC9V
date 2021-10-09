import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from '../app.service';

@Component({
  selector: 'app-addbanner',
  templateUrl: './addbanner.component.html',
  styleUrls: ['./addbanner.component.scss']
})
export class AddbannerComponent implements OnInit {

  bannerForm: FormGroup;
  submitted: boolean = false;
  options: any;
  urls_coverPhoto: any;
  formData = new FormData();
  message:string;


  constructor(public formBuilder: FormBuilder, private userService: AppService, private router: Router,private spinner: NgxSpinnerService) { }

  get c() { return this.bannerForm.controls };

  ngOnInit() {
    this.bannerForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      bannerImage:['',[Validators.required]]
    });
  }

  SaveBanner(): void {
    this.submitted = true;
    if (this.bannerForm.valid) {
      this.formData.set("title", this.bannerForm.value.title);
      this.formData.set("storeId",localStorage.getItem("storeId"));
      this.spinner.show();
      this.userService.addBanner(this.formData).subscribe((data) => {
        this.spinner.hide();
        if (data.statusCode == 200) {
          this.router.navigate(['banner-list']);
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
    this.bannerForm.reset();
    this.router.navigate(['catagory-list']);
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
          this.formData.set('bannerImage', file, file.name);
          this.bannerForm.controls["bannerImage"].setValue(this.formData.get('bannerImage'));
        }
      }
    }
  }

}
