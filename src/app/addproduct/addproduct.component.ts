import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgxSpinnerService } from 'ngx-spinner';

class ImageDimentions{
  index:number;
  height:number;
  width:number;
}


@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit {
  public Editor = ClassicEditor;
  productForm: FormGroup;
  submitted: boolean = false;
  options: any;
  urls_coverPhoto: any;
  Images: any[] = ["", "", "", "", ""];
  colors: any[] = ["", "", "", "", ""];
  formData = new FormData();
  catagories :any[] = [];
  colorList: any[] = [];
  imgdimentionsError:boolean[] = [false,,false,false,false,false];

  data = {
    page : 1,
    limit: '',
    text: '',
    storeId: '',
    filter: ''
  }

  dropdownList = [
    { item_id: 1, item_text: 'Catagory1' },
    { item_id: 2, item_text: 'Catagory2' },
    { item_id: 3, item_text: 'Catagory3' },
    { item_id: 4, item_text: 'Catagory4' },
    { item_id: 5, item_text: 'Catagory5' }
  ];

  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: '_id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  message:string;

  constructor(public formBuilder: FormBuilder, private userService: AppService, private router: Router,private spinner: NgxSpinnerService) { }

  get c() { return this.productForm.controls };

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      productType:['',[Validators.required]],
      companyName:['',[Validators.required]],
      quantity: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['',],
      categories: [''],
    });

    this.getCatagories(this.data);
    this.getColors(this.data);
  }

  SaveProduct(): void {
    this.submitted = true;
    this.spinner.show();
    debugger
    if (this.productForm.valid) {
      let cat = this.productForm.value.categories;
      this.formData.set("name", this.productForm.value.name);
      this.formData.set("productType", this.productForm.value.productType);
      this.formData.set("companyName", this.productForm.value.companyName);
      this.formData.set("storeId", localStorage.storeId);
      this.formData.set("price", this.productForm.value.price);
      this.formData.set("description", this.productForm.value.description);
      this.formData.set("categories", JSON.stringify(cat));

      this.formData.set("quantity", this.productForm.value.quantity);
      // this.formData.set("one", this.Images[0] ? (this.Images[0]) : null);
      // this.formData.set("two", this.Images[1] ? (this.Images[1]) : null);
      // this.formData.set("three", this.Images[2] ? (this.Images[2]) : null);
      // this.formData.set("four", this.Images[3] ? (this.Images[3]) : null);
      // this.formData.set("five", this.Images[4] ? (this.Images[4]) : null);
      this.formData.set("nameOne", this.colors[0] ? this.colors[0] : null);
      this.formData.set("nameTwo", this.colors[1] ? this.colors[1] : null);
      this.formData.set("nameThree", this.colors[2] ? this.colors[2] : null);
      this.formData.set("nameFour", this.colors[3] ? this.colors[3] : null);
      this.formData.set("nameFive", this.colors[4] ? this.colors[4] : null);

      this.userService.addProduct(this.formData).subscribe((data) => {
        debugger
        this.spinner.hide();
        if (data.statusCode == 200) {
          this.router.navigate(['product-list']);
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
    this.productForm.reset();
    this.router.navigate(['product-list']);
  }

  getColors(data){
    this.spinner.show();
    this.userService.getColors(data).subscribe((data)=>{
      this.spinner.hide();
      if(data.statusCode == 200){
        this.colorList = data.data.stores;
      }
    },
    (err)=>{
      this.spinner.hide();
      console.log(err);
    });
  }

  getCatagories(data){
    this.spinner.show();
    this.data.storeId = localStorage.storeId;
    this.userService.getCatagories(data).subscribe((data)=>{
      debugger
      this.spinner.hide();
      if(data.statusCode == 200){
        this.catagories = data.data.stores;
      }
    },
    (err)=>{
      this.spinner.hide();
      console.log(err);
    });
  }



  fileUploadCoverPhoto(event, index) {
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
            // this.urls_coverPhoto.push(e.target.result);
            this.Images[index] = e.target.result;
            var img = new Image();
            img.src = e.target.result;
            img.onload = () =>{
              if(img.height != 100 || img.width != 170){
                this.imgdimentionsError[index] = true;
              }
            }
          }
          reader.readAsDataURL(file);
          switch(index){
            case 0:
              this.formData.set("one", file, file.name);
              break;
              case 1:
              this.formData.set("two", file, file.name);
              break;
              case 2:
              this.formData.set("three", file, file.name);
              break;
              case 3:
              this.formData.set("four", file, file.name);
              break;
              case 4:
              this.formData.set("five", file, file.name);
              break;
          }
        }
      }
    }
  }
}
