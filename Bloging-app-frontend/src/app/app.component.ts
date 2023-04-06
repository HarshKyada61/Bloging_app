import { Component, OnInit } from '@angular/core';
import { DataStorageService } from './shared/data-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Bloging-app-frontend';
  token = localStorage.getItem('token')
  
  constructor(public dataHanler: DataStorageService){}

  ngOnInit(): void {
    if(this.token){
      this.dataHanler.isAuthenticated.next(true)
    }
  }
}
