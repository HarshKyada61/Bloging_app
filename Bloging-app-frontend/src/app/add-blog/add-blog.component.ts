import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataStorageService } from '../shared/data-handler.service';
import { Route, Router } from '@angular/router';
import { BlogService } from '../shared/blog.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit{
  @ViewChild('form') addblog: NgForm;
  createMode = true 
  blog={
    Title:'',
    Body:'',
    Category:'',
    _id: ''
  }
  constructor(public dataHandler: DataStorageService,public router: Router,public blogService:BlogService){}

  ngOnInit(){
    if(this.router.url.includes('update')){
      this.createMode = false
      this.blog = this.blogService.blog
    }
    else{
      this.createMode = true
    }
    
  }

  onSubmit(){
    const blog = this.addblog.form.value
    this.dataHandler.addBlog(blog).subscribe((res:any) => {
      this.router.navigate(['/']);
    })
    
  }

  onUpdate(){
    const blog = this.addblog.form.value
    this.dataHandler.updateBlog(blog, this.blog._id).subscribe(res => {
      this.router.navigate(['/blog/'+this.blog._id])
    })
  }

}
