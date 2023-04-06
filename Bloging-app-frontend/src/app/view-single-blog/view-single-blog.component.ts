import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataStorageService } from '../shared/data-handler.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-single-blog',
  templateUrl: './view-single-blog.component.html',
  styleUrls: ['./view-single-blog.component.css'],
})
export class ViewSingleBlogComponent implements OnInit,OnDestroy{
  blog={
    Title:'',
    Body:'',
    _id:''
  };
  comments:any
  canComment:Boolean;
  
  
  blogSub: Subscription;
  constructor(private route: ActivatedRoute, public dataHandler: DataStorageService){}


  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    this.blogSub = this.dataHandler.fetchBlog(id).subscribe((data:any) => {
      
      this.blog = data.blog;
      this.comments = data.comments
    

    });
    this.dataHandler.canComment.subscribe(permission => {
      this.canComment = permission
    })
  }

  onAddComment(){
    this.dataHandler.canComment.next(!this.canComment);
  }

  ngOnDestroy() {
    this.blogSub.unsubscribe()
  }
}
