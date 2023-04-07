import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataStorageService } from '../shared/data-handler.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { BlogService } from '../shared/blog.service';

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

  constructor(public dataHandler: DataStorageService, public router: Router, public blogService: BlogService){}

  ngOnInit(){
    this.userSub = this.dataHandler.fetchUser().subscribe((res:any) => {
      this.user = res.user;      
      this.blogs = res.blog
    })
  }

  onDeleteProfile(){    
    this.dataHandler.DeleteUser().subscribe(res => {
      localStorage.removeItem('token');
      this.router.navigate(['/'])
    })
  }

  onUpdateProfile(updateName:any,updateEmail:any){
    const updateduser = {
      name:updateName.value,
      email:updateEmail.value
    }
    
    
    this.dataHandler.updateUser(updateduser).subscribe(res => {
      this.ngOnInit()
    })
  }

  onDeleteBlog(id:string){    
    this.dataHandler.deleteBlog(id).subscribe(res => {
      this.ngOnInit()
    })
  }

  onUpdateBlog(blog:any){
    this.blogService.blog = blog;
    this.router.navigate(['/blogs/update'])
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe()
  }

  
}
