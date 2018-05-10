import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response } from '@angular/http'
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  page : string;
  constructor(private http : Http, private route: ActivatedRoute) { 
    const pageNumber = this.route.snapshot.params['page'];
    this.page = pageNumber;
    console.log(this.page)
  }

  ngOnInit() {
    this.onChangePageClick();
  }
  private async onChangePageClick() {
    const sub = this.http.get('https://yts.am/api/v2/list_movies.json?' + this.page).subscribe((response: Response) => {

      sub.unsubscribe();
    }, error => {
      console.log(error);
      sub.unsubscribe();
    });
  }
}
