import { Component } from '@angular/core';
import { Http, Response } from '@angular/http'
import * as $ from 'jquery'
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  status: string;
  pages: Array<number>;
  totalPages: number;
  p: number = 1;
  constructor(private http: Http,private router: Router) { }

  ngOnInit(): void {
    this.loadMovies();
  }


  private async loadMovies() {
    this.status = 'Loading .........';
    const sub = this.http.get('https://yts.am/api/v2/list_movies.json').subscribe((response: Response) => {
      let calPage = response.json().data.movie_count % response.json().data.limit;
      if (calPage == 0) {
        calPage = response.json().data.movie_count / response.json().data.limit;
      } else {
        calPage = Math.ceil(response.json().data.movie_count / response.json().data.limit);
      }
      this.pages = Array.apply(null, { length: calPage }).map(Number.call, Number)
      this.totalPages = calPage;
      this.status = 'Load Done !'
      sub.unsubscribe();
    }, error => {
      console.log(error);
      this.status = 'Load Error !';
      sub.unsubscribe();
    });
  }
  onItemClicked(id) {
    this.router.navigate([`/browse-page/${id}`]);
  }
  
}
