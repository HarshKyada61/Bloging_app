import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-handler.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit,OnDestroy {
  userSub:Subscription
  user={
    name:"",
    email: ""
  }
  blogs:any
  token=localStorage.getItem('token')

  constructor(public dataHandler: DataStorageService, public router: Router){}

  ngOnInit(){
    this.userSub = this.dataHandler.fetchUser(this.token).subscribe((res:any) => {
      this.user = res.user;      
      this.blogs = res.blog
    })
  }

  onDelete(){
    console.log("in OnDelete");
    
    this.dataHandler.DeleteUser(this.token).subscribe(res => {
      localStorage.removeItem('token');
      this.router.navigate(['/'])
    })
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe()
  }
}
