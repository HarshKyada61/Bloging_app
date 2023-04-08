import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ProfileComponent } from './profile/profile.component';
import { ViewBlogsComponent } from './view-blogs/view-blogs.component';
import { ViewSingleBlogComponent } from './view-single-blog/view-single-blog.component';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path: '', redirectTo:'/blogs', pathMatch:'full'},
  {path: 'blogs', component:ViewBlogsComponent},
  {path: 'blog/:id', component:ViewSingleBlogComponent,},
  {path: 'profile', component:ProfileComponent,canActivate:[AuthGuard]},
  {path: 'auth', component:AuthComponent},
  {path: 'blogs/addBlog', component:AddBlogComponent,canActivate:[AuthGuard]},
  {path: 'blogs/update',component:AddBlogComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
