import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-handler.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css'],
})
export class AddCommentComponent {
  @ViewChild('form') blog: NgForm;
  @Input() blogid: string;


  

  constructor(public dataHandler: DataStorageService,public router: Router) {}

  addComment() {
    const token = localStorage.getItem('token');
    const comment = {
      blog: this.blogid,
      comment: this.blog.form.value.comment
    }
    
    this.dataHandler.addComment(token,comment).subscribe(res => {
      this.dataHandler.canComment.next(false);
      this.router.navigate(['/blog/'+this.blogid])
    })
  }
}
