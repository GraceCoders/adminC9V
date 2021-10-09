import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from '../app.service';

@Component({
  selector: 'app-driver-orders',
  templateUrl: './driver-orders.component.html',
  styleUrls: ['./driver-orders.component.scss']
})
export class DriverOrdersComponent implements OnInit {

  Messages:any[] = [
    {orderId:'1',customerName:'Cust1',address:'address 1',driverId:'1',driverName:'Driver 1'},
    {orderId:'2',customerName:'Cust1',address:'address 1',driverId:'2',driverName:'Driver 2'},
    {orderId:'3',customerName:'Cust1',address:'address 1',driverId:'3',driverName:'Driver 3'}
  ];

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
  }

  OpenAddStore() {

  }

  

  loadPage(page: number) {
    this.data.page = page;
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
          this.Messages.splice(index, 1);
        }
      });
    }
  }

  search(event) {
    this.data.filter = event.target.value;
  }

}
