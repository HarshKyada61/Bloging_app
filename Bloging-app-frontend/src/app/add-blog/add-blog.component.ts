import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataStorageService } from '../shared/data-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent {
  @ViewChild('form') addblog: NgForm;

  constructor(public dataHandler: DataStorageService,public router: Router){}

  onSubmit(){
    const token = localStorage.getItem('token')
    const blog = this.addblog.form.value
    this.dataHandler.addBlog(blog,token).subscribe(res => {
      this.router.navigate(['/']);
    })
    
  }

}
