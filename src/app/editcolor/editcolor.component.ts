import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from '../app.service';

@Component({
  selector: 'app-editcolor',
  templateUrl: './editcolor.component.html',
  styleUrls: ['./editcolor.component.scss']
})
export class EditcolorComponent implements OnInit {

  colorForm: FormGroup;
  submitted: boolean = false;
  options: any;
  urls_coverPhoto: any;
  formData = new FormData();
  colorId: any;
  image: any;
  message: string;

  constructor(public formBuilder: FormBuilder, private userService: AppService, private router: Router, private route: ActivatedRoute,private spinner: NgxSpinnerService) { }

  get c() { return this.colorForm.controls };

  ngOnInit() {
    this.colorForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      hexCode: ['', [Validators.required]]
    });

    this.route.queryParams.subscribe((params) => {
      this.colorId = params.color_id;
      this.colorForm.addControl('colorId', new FormControl('', Validators.required));
      this.colorForm.controls['colorId'].setValue(this.colorId);
      var data = {
        colorId: params.color_id
      }
      this.getColorData(data);
    });
  }

  getColorData(data) {
    this.spinner.show();
    this.userService.getColor(data).subscribe((data) => {
      this.spinner.hide();
      if (data.statusCode == 200) {
        this.colorForm.patchValue(data.data);
        this.image = data.data.image;
      }
    },
      (err) => {
        this.spinner.hide();
        console.log(err);
      })
  }

  UpdateColor(): void {
    this.submitted = true;
    debugger
    if (this.colorForm.valid) {
      this.formData.set("name", this.colorForm.value.name);
      this.formData.set("hexCode", this.colorForm.value.hexCode);
      this.formData.set("colorId", this.colorForm.value.colorId);
      this.formData.set("storeId", localStorage.getItem("storeId"));
      this.spinner.show();
      this.userService.updateColor(this.formData).subscribe((data) => {
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
          this.formData.set('image', file, file.name);
          this.colorForm.controls["image"].setValue(this.formData.get('storeImage'));
        }
      }
    }
  }

}
