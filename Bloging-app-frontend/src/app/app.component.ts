import { Component, OnInit } from '@angular/core';
import { DataStorageService } from './shared/data-handler.service';
import { Event, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Bloging-app-frontend';
  token = localStorage.getItem('token')
  
  constructor(public dataHanler: DataStorageService,private router: Router){}

  ngOnInit(): void {
    if(this.token){
      this.dataHanler.isAuthenticated.next(true)
    }

    this.router.events.subscribe((event: Event) => {
      

      if (event instanceof NavigationEnd) {

          if(event.url === "/" || event.url === '/blogs'){
            this.dataHanler.isBlogs.next(true)
          }
          else{
            this.dataHanler.isBlogs.next(false)
          }
                    
          
      }

    
  });

  }
}
