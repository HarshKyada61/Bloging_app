import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  isAuthenticated:Boolean;
  constructor(public dataHandler: DataStorageService, public router: Router){}

  ngOnInit(){
    this.dataHandler.isAuthenticated.subscribe((authStatus:any) => {
      this.isAuthenticated = authStatus;
    })
  }  

  onLogout(){
    this.dataHandler.logout().subscribe(res => {
      localStorage.removeItem('token')
      this.dataHandler.loggedinUser = null
      this.dataHandler.isAuthenticated.next(false);
      this.router.navigate(["/"])
    })
 
  }
}
