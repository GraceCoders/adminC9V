import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public baseUrl: any;
  public image_url: any;

  constructor() { 
    // this.baseUrl = "http://localhost:8080/",
    // this.image_url = "http://localhost:8080/uploads/" 
    this.baseUrl = "http://52.14.185.147:/8080/",
    this.image_url = "http://52.14.185.147:8080/uploads/" 
  }
}