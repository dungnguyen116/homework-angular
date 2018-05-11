import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Response } from '@angular/http'
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  page: number;
  movies: Array<object>;
  
  constructor(private http: Http, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.page = id;
    this.loadMovies();
  }


  private async loadMovies() {
    const sub = this.http.get('https://yts.am/api/v2/list_movies.json?page='+this.page).subscribe((response: Response) => {
      this.movies = response.json().data.movies;

      const id = this.route.snapshot.params['id'];
      console.log(id);
      sub.unsubscribe();
    }, error => {
      console.log(error);
      sub.unsubscribe();
    });
  }
  

}
