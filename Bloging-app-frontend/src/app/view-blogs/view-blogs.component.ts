import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-handler.service';
import { Subscription } from 'rxjs';
import { Blog } from '../blog';

@Component({
  selector: 'app-view-blogs',
  templateUrl: './view-blogs.component.html',
  styleUrls: ['./view-blogs.component.css']
})
export class ViewBlogsComponent implements OnInit, OnDestroy{
  blogs: any;
  blogsSub : Subscription;
  constructor(public dataHandler: DataStorageService){}
  
  ngOnInit(){
    this.blogsSub = this.dataHandler.fetchBlogs().subscribe((blogs:any) => {     
      this.blogs = blogs
    });

  }
  ngOnDestroy(){
    this.blogsSub.unsubscribe();
  }
}
