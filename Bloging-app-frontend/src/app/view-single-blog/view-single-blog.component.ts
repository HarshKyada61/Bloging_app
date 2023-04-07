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
    _id:'',
    user:''
  };
  comments:any
  canComment:Boolean;
  user = this.dataHandler.loggedinUser
  isAuthenticated:any
  
  
  blogSub: Subscription;
  constructor(private route: ActivatedRoute, public dataHandler: DataStorageService){}


  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    this.blogSub = this.dataHandler.fetchBlog(id).subscribe((data:any) => {
      
      this.blog = data.blog;
      this.comments = data.comments

      this.dataHandler.isAuthenticated.subscribe((authStatus:any) => {
        this.isAuthenticated = authStatus;
      })

    });
    this.dataHandler.canComment.subscribe(permission => {
      this.canComment = permission
    })
  }

  reloadComponent(){
    this.ngOnInit()
  }

  onAddComment(){
    this.dataHandler.canComment.next(!this.canComment);
  }

  onDeleteComment(id:string){
    this.dataHandler.deleteComment(id).subscribe((res:any) => this.ngOnInit())
  }

  ngOnDestroy() {
    this.blogSub.unsubscribe()
  }
}
