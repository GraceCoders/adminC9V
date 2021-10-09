import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from '../app.service';

@Component({
  selector: 'app-stores-list',
  templateUrl: './stores-list.component.html',
  styleUrls: ['./stores-list.component.scss']
})
export class StoresListComponent implements OnInit {

  stores = [];

  data = {
    page: 1,
    limit: '',
    text: '',
    storeId: '',
    filter: ''
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
    this.getStores(this.data);
  }

  OpenAddStore() {

  }

  getStores(data) {
    this.spinner.show();
    this.userService.getStores(data).subscribe((data) => {
      if (data.statusCode == 200) {
        this.stores = data.data.stores;
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
    this.getStores(this.data);
  }

  editStore(store_id) {
    this.router.navigate(['editStore'], { queryParams: { store_id: store_id } });
  }

  deleteStore(store_id, index) {

    var consent = confirm("Do you want to delete this user ?");
    if (consent) {
      this.spinner.show();
      this.userService.deleteStore({ storeId: store_id }).subscribe((data) => {
        debugger
        this.spinner.hide();
        if (data.statusCode == 200) {
          this.stores.splice(index, 1);
          this.getStores(this.data);
        }
      },
        (err) => {
          console.log(err);
          this.spinner.hide();
        });
    }
  }

  search(event) {
    this.data.filter = event.target.value;
    this.getStores(this.data)
  }

}
