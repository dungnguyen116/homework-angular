import { Component } from '@angular/core';
import { Http , Response} from '@angular/http'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  status: string;
  title = 'app';
  movies : Array<object>;

  constructor(private http : Http){ }

  ngOnInit() :void{
    this.loadMovies();
  }

  private async loadMovies(){
    this.status = 'Loading .........';
    const sub = this.http.get('https://yts.am/api/v2/list_movies.json').subscribe((response : Response)=>{
      response.json().data.limit
      this.movies = response.json().data.movies;
      this.status = 'Load Done !'
      sub.unsubscribe();
    }, error =>{
      console.log(error);
      this.status = 'Load Error !';
      sub.unsubscribe();
    });
  }
}
