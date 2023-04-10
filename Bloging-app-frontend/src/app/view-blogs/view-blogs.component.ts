import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-handler.service';
import { Subscription } from 'rxjs';
import { Blog } from '../blog';

@Component({
  selector: 'app-view-blogs',
  templateUrl: './view-blogs.component.html',
  styleUrls: ['./view-blogs.component.css'],
})
export class ViewBlogsComponent implements OnInit, OnDestroy {
  blogs: any;
  blogsSub: Subscription;
  filteredBlogs:any;
  constructor(public dataHandler: DataStorageService) {}

  ngOnInit() {
    this.blogsSub = this.dataHandler.fetchBlogs().subscribe((blogs: any) => {
      this.blogs = blogs;
      this.filteredBlogs = this.blogs
    });

    let pageNO = 1;
    window.addEventListener('scroll', () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
        // console.log(scrollTop+clientHeight,scrollHeight);
        
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        
        pageNO += 1;
        this.blogsSub = this.dataHandler
          .fetchBlogs(pageNO)
          .subscribe((blogs: any) => {
            this.blogs = [...this.blogs, ...blogs];
            this.filteredBlogs = this.blogs
          });
      }
    });

    this.dataHandler.searchItem.subscribe(search => {
      if (search !== '') {
        this.filteredBlogs = this.blogs.filter((blog: any) => {
          return blog.Title.toLowerCase().includes(search.toLowerCase());
        });
      }
      else{
        this.filteredBlogs = this.blogs
      }
    });
  }
  ngOnDestroy() {
    this.blogsSub.unsubscribe();
  }
}
