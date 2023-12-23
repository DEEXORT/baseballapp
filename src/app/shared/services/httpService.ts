import {Injectable} from "@angular/core";
import {IPlayer} from "../interfaces/player";
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable()

export class HttpService {

  constructor(private http: HttpClient) {
  }

  url = 'http://localhost:3000'

  getRequest(table: string): Observable<IPlayer[]> {

    console.log(`HTTP запрос в базу ${table}...`)
    const dbTable = '/' + table;

    return this.http.get(this.url + dbTable)
      .pipe(map((data: any) => {return data}))
  }

}
