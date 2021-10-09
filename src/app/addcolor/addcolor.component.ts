import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from '../app.service';

@Component({
  selector: 'app-addcolor',
  templateUrl: './addcolor.component.html',
  styleUrls: ['./addcolor.component.scss']
})
export class AddcolorComponent implements OnInit {

  colorForm: FormGroup;
  submitted: boolean = false;
  options: any;
  urls_coverPhoto: any;
  formData = new FormData();
  message:string;

  constructor(public formBuilder: FormBuilder, private userService: AppService, private router: Router,private spinner: NgxSpinnerService) { }

  get c() { return this.colorForm.controls };

  ngOnInit() {
    this.colorForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      hexCode:['',[Validators.required]]
    });
  }

  SaveColor(): void {
    this.spinner.show();
    this.submitted = true;
    if (this.colorForm.valid) {
      this.formData.set("name", this.colorForm.value.name);
      this.formData.set("hexCode", this.colorForm.value.hexCode);
      this.formData.set("storeId",localStorage.getItem("storeId"));
      let reqModel = {name : this.colorForm.value.name , hexCode : this.colorForm.value.hexCode , storeId :localStorage.getItem("storeId") };
      this.userService.addColor(reqModel).subscribe((data) => {
        this.spinner.hide();
        if (data.statusCode == 200) {

          this.router.navigate(['color-list']);
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
    this.colorForm.reset();
    this.router.navigate(['color-list']);
  }

}
