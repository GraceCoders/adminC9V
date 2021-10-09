import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AppService } from '../app.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.scss']
})
export class EditproductComponent implements OnInit {

  public Editor = ClassicEditor;
  productForm: FormGroup;
  submitted: boolean = false;
  options: any;
  urls_coverPhoto: any;
  Images:any[] = ["","","","",""];
  colors: any[] = ["", "", "", "", ""];
  catagories :any[] = [];
  colorList: any[] = [];
  formData = new FormData();
  productId:string;
  imgdimentionsError:boolean[] = [false,false,false,false,false];
  ImagesArray:any[];
  isChanged = false;

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

  constructor(public formBuilder: FormBuilder, private userService: AppService, private router: Router,
    private route: ActivatedRoute,private spinner: NgxSpinnerService) { }

  get c() { return this.productForm.controls };

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      productType:['',[Validators.required]],
      companyName:['',[Validators.required]],
      quantity: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: [''],
      categories: [''],
    });

    this.getCatagories(this.data);
    this.getColors(this.data);

    this.route.queryParams.subscribe((params) => {
      this.productId = params.product_id;
      this.productForm.addControl('productId', new FormControl('', Validators.required));
      this.productForm.controls['productId'].setValue(this.productId);
      var data = {
        productId: params.product_id
      }
      this.getProduct(data);
    });
  }

  getCatagories(data){
    this.data.storeId = localStorage.storeId;
    this.spinner.show();
    this.userService.getCatagories(data).subscribe((data)=>{
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

  getProduct(data) {
    this.spinner.show();
    this.userService.getProduct(data).subscribe((data) => {
      this.spinner.hide();
      if (data.statusCode == 200) {
        if(data.data.images){
          data.data.images.forEach(element => {
            this.Images[element.index] = element.image;
            this.colors[element.index] = element.hexCode;
          });
          this.ImagesArray = data.data.Images;
          this.productForm.patchValue(data.data);
          this.productForm.controls["categories"].setValue(JSON.parse(data.data.categories));
        }
      }
    },
      (err) => {
        this.spinner.hide();
        console.log(err);
      })
  }

  updateProduct(): void {
    this.submitted = true;
    if (this.productForm.valid) {
      let cat = this.productForm.value.categories;
      this.formData.set("name", this.productForm.value.name);
      this.formData.set("productType", this.productForm.value.productType);
      this.formData.set("companyName", this.productForm.value.companyName);
      this.formData.set("productId", this.productForm.value.productId);
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

      if(!this.isChanged){
        this.formData.set("Images",JSON.stringify(this.ImagesArray));
      }
      this.spinner.show();
      this.userService.updateProduct(this.formData).subscribe((data) => {
        this.spinner.hide();
        if (data.statusCode == 200) {
          this.router.navigate(['product-list']);
          this.message = "";
        }
        else {
          this.spinner.hide();
          this.message = data.message;
        }
      },
        (err) => {
          console.log(err);
        })
    }
  }

  Cancel(): void {
    this.submitted = false;
    this.productForm.reset();
    this.router.navigate(['product-list']);
  }

  fileUploadCoverPhoto(event, index) {
    this.isChanged = true;
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
