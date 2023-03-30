import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user={
    userName:"Harsh",
    email: "dummyh@test.com"
  }
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
