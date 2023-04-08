import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewBlogsComponent } from './view-blogs/view-blogs.component';
import { HeaderComponent } from './header/header.component';
import { ViewSingleBlogComponent } from './view-single-blog/view-single-blog.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthComponent } from './auth/auth.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { AddCommentComponent } from './view-single-blog/add-comment/add-comment.component'

@NgModule({
  declarations: [
    AppComponent,
    ViewBlogsComponent,
    HeaderComponent,
    ViewSingleBlogComponent,
    ProfileComponent,
    AuthComponent,
    AddBlogComponent,
    AddCommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
