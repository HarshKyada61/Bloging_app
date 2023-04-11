import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-handler.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isblogs:boolean
  isAuthenticated:Boolean;
  isBlogsRoute:boolean

  constructor(public dataHandler: DataStorageService, public router: Router,private route:ActivatedRoute){}

  ngOnInit(){
    this.dataHandler.isAuthenticated.subscribe((authStatus:any) => {
      this.isAuthenticated = authStatus;
    })
    this.dataHandler.isBlogs.subscribe(isblog => {
      this.isBlogsRoute = isblog;
      
    })
  }  

  onLogout(){
    this.dataHandler.logout().subscribe(res => {
      
      this.router.navigate(["/"])
    })
  }

  onSubmit(form:NgForm){    
    this.dataHandler.searchItem.next(form.value.Search);
    this.router.navigate(['/'])
  }
}
