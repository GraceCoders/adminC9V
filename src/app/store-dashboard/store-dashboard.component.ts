import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from '../app.service';

@Component({
  selector: 'app-store-dashboard',
  templateUrl: './store-dashboard.component.html',
  styleUrls: ['./store-dashboard.component.scss']
})
export class StoreDashboardComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales:{
      yAxes:[{
        ticks:{
          beginAtZero:true
        }
      }]
    }
  };
  public barChartLabels: Label[] = ['March', 'April', 'May', 'June', 'July', 'Augest', 'September'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [6, 5, 8, 8, 3, 4, 9], label: 'Users' }
  ];

  public barChartData2: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Orders' }
  ];

  user_count = "";
  provider_count = "";
  subcategory_count = "";
  category_count = "";
  blob;
  constructor(
    private userService: AppService,  
    private spinner: NgxSpinnerService
    ) { 
    this.reloadPage();
  }

  reloadPage() {
    this.spinner.show();
    if(localStorage.getItem("isLoad") == "true"){
      window.location.reload();
      localStorage.setItem('isLoad',"false");
      this.spinner.hide();
    }

}

  ngOnInit() {
    this.spinner.hide();
      // this.dashboard();
      }

      dashboard(){
        var data = {};
        this.spinner.show();
         this.userService.dashboardCount(data).subscribe((data)=>{
          if(data.statusCode == 200){
            this.user_count = data.data.userCount; 
            this.provider_count = data.data.providerCount;
            this.category_count = data.data.categoryCount;
            this.subcategory_count = data.data.subCategoryCount;
            this.spinner.hide();
          } 
         },
         (err)=>{
           console.log(err);
         })
       }

}
