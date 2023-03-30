import { Component } from '@angular/core';

@Component({
  selector: 'app-view-single-blog',
  templateUrl: './view-single-blog.component.html',
  styleUrls: ['./view-single-blog.component.css'],
})
export class ViewSingleBlogComponent {
  blog = {
    title: 'This is My First Blog',
    body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem provident asperiores veritatis repudiandae, optio explicabo vel iure excepturi natus consequatur, velit cumque blanditiis itaque exercitationem qui in error doloribus laboriosam voluptas ratione! Nobis ea, quisquam rerum dolore eligendi modi sed, iste voluptate deleniti maiores fugiat. Ipsa necessitatibus natus doloribus quia minus libero nisi maiores iure optio veniam ex exercitationem esse nihil culpa, blanditiis aspernatur recusandae ad ea! Sequi repellat nesciunt magnam impedit totam officia ad. Libero quisquam facere eveniet, accusantium tenetur vel harum molestiae soluta cupiditate corporis ipsa inventore a reprehenderit alias, quas, accusamus ex quae amet repudiandae id! Atque.',
    comments: [{
      comment: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit, sint!"
    },
    {
      comment: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit, sint!"
    },
    {
      comment: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit, sint!"
    },
    {
      comment: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit, sint!"
    },
    {
      comment: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit, sint!"
    }]
  };
}
