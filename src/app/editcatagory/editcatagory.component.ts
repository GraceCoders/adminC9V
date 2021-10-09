import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from '../app.service';

@Component({
  selector: 'app-editcatagory',
  templateUrl: './editcatagory.component.html',
  styleUrls: ['./editcatagory.component.scss']
})
export class EditcatagoryComponent implements OnInit {

  catagoryForm: FormGroup;
  submitted: boolean = false;
  options: any;
  urls_coverPhoto: any;
  formData = new FormData();
  catagoryId:string;
  message:string;

  constructor(public formBuilder: FormBuilder, private userService: AppService, private router: Router, private route: ActivatedRoute,private spinner: NgxSpinnerService) { }

  get c() { return this.catagoryForm.controls };

  ngOnInit() {
    this.catagoryForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });

    this.route.queryParams.subscribe((params) => {
      this.catagoryId = params.catagory_id;
      this.catagoryForm.addControl('catagoryId', new FormControl('', Validators.required));
      this.catagoryForm.controls['catagoryId'].setValue(this.catagoryId);
      var data = {
        categoryId: params.catagory_id
      }
      this.getCatagoryData(data);
    });
  }

  getCatagoryData(data) {
    this.spinner.show();
    this.userService.getCatagory(data).subscribe((data) => {
      this.spinner.hide();
      if (data.statusCode == 200) {
        this.catagoryForm.patchValue(data.data);
      }
    },
      (err) => {
        this.spinner.hide();
        console.log(err);
      })
  }

  UpdateCatagory(): void {
    this.submitted = true;
    debugger
    if (this.catagoryForm.valid) {
      this.formData.set("name", this.catagoryForm.value.name);
      this.formData.set("categoryId", this.catagoryForm.value.catagoryId);
      this.formData.set("storeId",localStorage.getItem("storeId"));
      this.spinner.show();
      this.userService.updateCatagory(this.formData).subscribe((data) => {
        this.spinner.hide();
        if (data.statusCode == 200) {
          debugger
          this.router.navigate(['catagory-list']);
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
    this.catagoryForm.reset();
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
          this.formData.set('storeImage', file, file.name);
          this.catagoryForm.controls["image"].setValue(this.formData.get('storeImage'));
        }
      }
    }
  }

}
