import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from '../app.service';

@Component({
  selector: 'app-addcatagory',
  templateUrl: './addcatagory.component.html',
  styleUrls: ['./addcatagory.component.scss']
})
export class AddcatagoryComponent implements OnInit {

  catagoryForm: FormGroup;
  submitted: boolean = false;
  options: any;
  urls_coverPhoto: any;
  formData = new FormData();
  message:string;


  constructor(public formBuilder: FormBuilder, private userService: AppService, private router: Router,private spinner: NgxSpinnerService) { }

  get c() { return this.catagoryForm.controls };

  ngOnInit() {
    this.catagoryForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
  }

  SaveCatagory(): void {
    this.spinner.show();
    this.submitted = true;
    if (this.catagoryForm.valid) {
      this.formData.set("name", this.catagoryForm.value.name);
      this.formData.set("storeId",localStorage.getItem("storeId"));
      this.userService.addCatagory(this.formData).subscribe((data) => {
        this.spinner.hide();
        if (data.statusCode == 200) {
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

}
