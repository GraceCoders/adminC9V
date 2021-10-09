import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from '../app.service';

@Component({
  selector: 'app-colorlist',
  templateUrl: './colorlist.component.html',
  styleUrls: ['./colorlist.component.scss']
})
export class ColorlistComponent implements OnInit {

  colors = [];

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
    this.getColors(this.data);
  }

  OpenAddStore() {

  }

  getColors(data) {
    this.spinner.show();
    debugger
    this.userService.getColors(data).subscribe((data) => {
      debugger
      if (data.statusCode == 200) {
        this.colors = data.data.stores;
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
    this.getColors(this.data);
  }

  editColor(color_id) {
    this.router.navigate(['edit-color'], { queryParams: { color_id: color_id } });
  }

  deleteColor(colorId, index) {
    debugger
    var consent = confirm("Do you want to delete this user ?");
    if (consent) {
      this.spinner.show();
      this.userService.deleteColor({ colorId: colorId }).subscribe((data) => {
        this.spinner.hide();
        if (data.statusCode == 200) {
          this.colors.splice(index, 1);
        }
      });
    }
  }

  search(event) {
    this.data.filter = event.target.value;
    this.getColors(this.data)
  }

}
