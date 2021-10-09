import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from '../app.service';

@Component({
  selector: 'app-catagory-list',
  templateUrl: './catagory-list.component.html',
  styleUrls: ['./catagory-list.component.scss']
})
export class CatagoryListComponent implements OnInit {

  catagories:any[] = [];

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
    this.getCatagories(this.data);
  }

  OpenAddStore() {

  }

  getCatagories(data) {
    debugger
    this.spinner.show();
    this.catagoryId = 
    this.userService.getCatagories(data).subscribe((data) => {
      debugger
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
    this.getCatagories(this.data);
  }

  editStore(catagory_id) {
    this.router.navigate(['edit-catagory'], { queryParams: { catagory_id: catagory_id } });
  }

  deleteStore(catagory_id, index) {

    var consent = confirm("Do you want to delete this user ?");
    if (consent) {
      debugger
      this.userService.deleteCatagory({ categoryId: catagory_id,token:localStorage.getItem("token") }).subscribe((data) => {
        debugger
        if (data.statusCode == 200) {
          this.catagories.splice(index, 1);
        }
      });
    }
  }

  search(event) {
    this.data.filter = event.target.value;
    this.getCatagories(this.data)
  }

}
