import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from '../app.service';

@Component({
  selector: 'app-bannerlist',
  templateUrl: './bannerlist.component.html',
  styleUrls: ['./bannerlist.component.scss']
})
export class BannerlistComponent implements OnInit {

  banners:any[] = [];

  data = {
    page: 1,
    limit: '',
    text: '',
    storeId: localStorage.storeId,
    filter: ''
  }

  where = {
    filter: '',
    limit: 10,
    page: 1,
    order: -1
  }

  total = 0;
  catagoryId:any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: AppService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getBanners(this.data);
  }

  OpenAddStore() {

  }

  getBanners(data) {
    debugger
    this.spinner.show();
    this.userService.getBanners(data).subscribe((data) => {
      this.spinner.hide();
      if (data.statusCode == 200) {
        
        this.banners = data.data.banners;
        this.total = data.data.total
      }
    },
      (err) => {
        console.log(err);
        this.spinner.hide();
      })
  }

  loadPage(page: number) {
    this.data.page = page;
    this.getBanners(this.data);
  }

  editStore(catagory_id) {
    this.router.navigate(['edit-catagory'], { queryParams: { catagory_id: catagory_id } });
  }

  deleteBanner(banner_id, index) {

    var consent = confirm("Do you want to delete this user ?");
    if (consent) {
      this.spinner.show();

      this.userService.deleteBanner({ bannerId: banner_id }).subscribe((data) => {
        this.spinner.hide();

        if (data.statusCode == 200) {
          this.banners.splice(index, 1);
        }
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
      }
      );
    }
  }

  search(event) {
    this.data.filter = event.target.value;
    this.getBanners(this.data)
  }

}
