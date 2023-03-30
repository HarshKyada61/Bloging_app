import { Component } from '@angular/core';

@Component({
  selector: 'app-view-blogs',
  templateUrl: './view-blogs.component.html',
  styleUrls: ['./view-blogs.component.css']
})
export class ViewBlogsComponent {
  blogs=[
    {
      title: "BLog1",
      description: "This is Blog1"
    },
    {
      title: "Blog2",
      description: " This is Blog2"
    }
  ]
}
