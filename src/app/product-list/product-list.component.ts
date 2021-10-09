import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from '../app.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products = [];
  catagories : any = [];

  data = {
    page: 1,
    limit: '',
    text: '',
    storeId: localStorage.storeId,
    filter: '',
    catagoryId:''
  }

  dataCatagory = {
    storeId: localStorage.storeId
  }

  where = {
    filter: '',
    limit: 10,
    page: 1,
    order: -1
  }

  total = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: AppService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getProducts(this.data);
    this.getCatagories(this.dataCatagory);
  }

  OpenAddStore() {

  }

  getProducts(data) {
    this.spinner.show();
    this.userService.getProducts(data).subscribe((data) => {
      if (data.statusCode == 200) {
        this.products = data.data.products;
        this.total = data.data.total
        this.spinner.hide();
        debugger
        this.products.forEach(e => {
          e.catagoriesName = "";
          let  data = JSON.parse(e.categories)
          data.forEach(element => {
            if(element.name){
              e.catagoriesName += element.name + ',';
            }
          });
        })
      }
    },
      (err) => {
        console.log(err);
        this.spinner.hide();
      })
  }

  getCatagories(data) {
    this.spinner.show();
    this.userService.getCatagories(data).subscribe((data) => {
      if (data.statusCode == 200) {
        
        this.catagories = data.data.stores;
        this.total = data.data.total
        this.spinner.hide();
      }
    },
      (err) => {
        console.log(err);
        this.spinner.hide();
      })
  }

  loadPage(page: number) {
    this.data.page = page;
    this.getProducts(this.data);
  }

  editProduct(product_id) {
    this.router.navigate(['edit-product'], { queryParams: { product_id: product_id } });
  }

  deleteStore(product_id, index) {

    var consent = confirm("Do you want to delete this user ?");
    if (consent) {
      this.userService.deleteProduct({ product_id: product_id }).subscribe((data) => {
        if (data.statusCode == 200) {
          this.products.splice(index, 1);
        }
      });
    }
  }

  search(event) {
    this.data.filter = event.target.value;
    this.getProducts(this.data);
  }

  filterByCatagory(event){
    this.data.catagoryId = event.target.value;
    this.getProducts(this.data);
  }

}
