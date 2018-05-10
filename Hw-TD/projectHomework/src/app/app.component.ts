import { Component } from '@angular/core';
import { Http , Response} from '@angular/http'
import * as $ from 'jquery'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  status: string;
  title = 'app';
  movies : Array<object>;
  pages : number;
  constructor(private http : Http){ }

  ngOnInit() :void{
    this.loadMovies();
  }

  private async loadMovies(){
    this.status = 'Loading .........';
    const sub = this.http.get('https://yts.am/api/v2/list_movies.json').subscribe((response : Response)=>{
      this.movies = response.json().data.movies;
      let calPage = response.json().data.movie_count % response.json().data.limit;
      if(calPage == 0){
        this.pages = response.json().data.movie_count / response.json().data.limit;
      }else{
        this.pages = Math.ceil(response.json().data.movie_count / response.json().data.limit);
      }
      this.status = 'Load Done !'
      sub.unsubscribe();
    }, error =>{
      console.log(error);
      this.status = 'Load Error !';
      sub.unsubscribe();
    });
  }
  private async onChangePageClick(){
    const sub = this.http.get('https://yts.am/api/v2/list_movies.json?page=').subscribe((response : Response)=>{

      this.status = 'Load Done !'
      sub.unsubscribe();
    }, error =>{
      console.log(error);
      this.status = 'Load Error !';
      sub.unsubscribe();
    });
  }
}
