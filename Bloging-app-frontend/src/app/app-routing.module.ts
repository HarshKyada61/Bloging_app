import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ProfileComponent } from './profile/profile.component';
import { ViewBlogsComponent } from './view-blogs/view-blogs.component';
import { ViewSingleBlogComponent } from './view-single-blog/view-single-blog.component';

const routes: Routes = [
  {path: '', redirectTo:'/blogs', pathMatch:'full'},
  {path: 'blogs', component:ViewBlogsComponent},
  {path: 'blog/:id', component:ViewSingleBlogComponent},
  {path: 'profile', component:ProfileComponent},
  {path: 'auth', component:AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
