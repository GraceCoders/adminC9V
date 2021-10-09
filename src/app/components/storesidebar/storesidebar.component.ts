import { Component, OnInit } from '@angular/core';


declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/store-dashboard', title: 'Dashboard',  icon: 'design_app', class: '' },
  {path: '/product-list',title:'Products',icon:'shopping_basket',class:''},
  {path: '/catagory-list',title:'Catagories',icon:'design_bullet-list-67',class:''},
  {path: '/color-list',title:'Colors',icon:'design_palette',class:''},
  {path: '/driver-list' , title:'Drivers',icon:'shopping_delivery-fast',class:''},
  {path:'/banner-list',title:'Banners',icon:'ui-1_calendar-60',class:''},
  {path:'/order-list',title:'Orders',icon:'shopping_bag-16',class:''},
  {path:'/driver-orders',title:'Driver Order',icon:'shopping_delivery-fast',class:''},
  {path:'/store-help',title:'Help & Support',icon:'travel_info',class:''},
  {path:'/rating-feedback-store',title:'Rating & Feedback',icon:'emoticons_satisfied',class:''},
  // { path: '/dashboard', title: 'Dashboard',  icon: 'design_app', class: '' },
  // { path: '/users', title: 'Users',  icon: 'design_bullet-list-67', class: '' },
  // {path : '/stores', title: 'stores', icon: 'design_bullet-list-67', class: ''}
  //  { path: '/categories', title: 'Categories',  icon:'design_bullet-list-67', class: '' },
  //  { path: '/states', title: 'States',  icon:'design_bullet-list-67', class: '' },
  //  { path: '/subcategories', title: 'Subcategories',  icon:'design_bullet-list-67', class: '' },
  //  { path: '/user-messages', title: 'Messages',  icon:'design_bullet-list-67', class: '' }
];

@Component({
  selector: 'app-storesidebar',
  templateUrl: './storesidebar.component.html',
  styleUrls: ['./storesidebar.component.scss']
})
export class StoresidebarComponent implements OnInit {

  isToggle = true;
  sideClass = ''
  width = 260;
  menuItems: any[];
  username;
  storeName:string;
  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.username = localStorage.getItem('username');
    this.storeName = localStorage.getItem('storename');
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
  
  openNav(){
  this.isToggle = this.isToggle == true ? this.isToggle = false : this.isToggle = true;
  this.width = this.width == 260 ? this.width = 0 : this.width = 260; 
  this.sideClass = this.sideClass == '' ? this.sideClass = 'sidebarClass' : this.sideClass = '';
  document.getElementById("mySidepanel").style.width = `${this.width}px`;
  }

}
