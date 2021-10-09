import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from '../app.service';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.scss']
})
export class DriverListComponent implements OnInit {

  drivers = [];

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: AppService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getDrivers(this.data);
  }

  OpenAddStore() {

  }

  getDrivers(data) {
    this.spinner.show();
    this.userService.getDrivers(data).subscribe((data) => {
      if (data.statusCode == 200) {
        this.drivers = data.data.stores;
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
    this.getDrivers(this.data);
  }

  editDriver(driver_id) {
    this.router.navigate(['edit-driver'], { queryParams: { driver_id: driver_id } });
  }

  deleteDriver(store_id, index) {

    var consent = confirm("Do you want to delete this user ?");
    if (consent) {
      this.userService.deleteStore({ storeId: store_id }).subscribe((data) => {
        if (data.statusCode == 200) {
          this.drivers.splice(index, 1);
        }

      })
    }
  }

  search(event) {
    this.data.filter = event.target.value;
    this.getDrivers(this.data);
  }

}
