
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products = [];

 size = ''
 pagination = false;
 total = 0;
  data = {
    page : 1,
    limit: '',
    text: '',
    vendorId: ''

  }
  where = {
    filter: '',
		limit: 10,
    page: 1,
    order: -1
	}

  constructor( private router: Router, 
              private route: ActivatedRoute,
               private userService: AppService,
               private spinner: NgxSpinnerService) { }

  ngAfterViewInit() {
    // Hack: Scrolls to top of Page after page view initialized
    let top = document.getElementById('top');
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    }
  }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.data.vendorId = params.vendorId;
    this.getProducts(this.data)
    });
  }

  getProducts(data){
    this.spinner.show();
    this.userService.getProducts(data).subscribe((data)=>{
      console.log("=== chekc dat data dtada====",data);
      if(data.statusCode == 200){
        this.products = data.data.products;
        this.total = data.data.total
        this.spinner.hide();
      }
    },
    (err)=>{
      console.log(err);
      this.spinner.hide();
    })
  }

  editProvider(id){
    this.router.navigate(['edit-vendor'], { queryParams: { providerId: id } });
  }


  viewProduct(id,type){
    console.log("===print type type=======",type);
    this.router.navigate(['view-product'], { queryParams: { productId: id,type:type } });
  }

  loadPage(page: number) {
   this.data.page = page;
   this.getProducts(this.data);
  }
  search(event){
    this.data.text = event.target.value;
    this.getProducts(this.data)
  }

}
