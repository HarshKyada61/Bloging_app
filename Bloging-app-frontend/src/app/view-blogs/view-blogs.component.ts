import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-handler.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Blog } from '../blog';

@Component({
  selector: 'app-view-blogs',
  templateUrl: './view-blogs.component.html',
  styleUrls: ['./view-blogs.component.css'],
})
export class ViewBlogsComponent implements OnInit, OnDestroy {
  blogs: any;
  blogsSub: Subscription;
  initialBlogs:any;
  isBlogChanged = new BehaviorSubject<boolean>(false)
  searchSub : Subscription;
  constructor(public dataHandler: DataStorageService) {}

  ngOnInit() {
    this.blogsSub = this.dataHandler.fetchBlogs().subscribe((blogs: any) => {
      this.blogs = blogs;
      this.initialBlogs = this.blogs
    });

    let pageNO = 1;
    window.addEventListener('scroll', () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

        
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        
        pageNO += 1;
        this.blogsSub = this.dataHandler
          .fetchBlogs(pageNO)
          .subscribe((blogs: any) => {
            this.blogs = [...this.blogs, ...blogs];
            this.initialBlogs = this.blogs
            this.isBlogChanged.next(true)
          });
      }
    });

    

    

    this.searchSub = this.dataHandler.searchItem.subscribe(search => {
      if (search !== '') {

        this.blogs = this.initialBlogs.filter((blog: any) => {
          return blog.Title.toLowerCase().includes(search.toLowerCase());
        });

        
        

        if(this.blogs.length< 5){
          
          this.blogs = this.initialBlogs
          pageNO += 1;
          this.blogsSub = this.dataHandler
            .fetchBlogs(pageNO)
            .subscribe((blogs: any) => {
              this.blogs = [...this.blogs, ...blogs];
              this.initialBlogs = this.blogs
              this.isBlogChanged.next(true)
            });
        }

        this.isBlogChanged.subscribe(ischanged => {
          if(ischanged){
            this.blogs = this.initialBlogs.filter((blog: any) => {
              return blog.Title.toLowerCase().includes(search.toLowerCase());
            });
            this.isBlogChanged.next(false)
          }
        })
        
      }
      else{
        this.blogs = this.initialBlogs
      }
    });

  }
  ngOnDestroy() {
    this.blogsSub.unsubscribe();
    this.dataHandler.searchItem.next('');
  }
}
