import {Injectable} from "@angular/core";
import {IPlayer} from "../interfaces/player";
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable()

export class HttpService {

  constructor(private http: HttpClient) {
  }

  url = 'http://localhost:3000'

  getRequest(table: string): Observable<any> {

    console.log(`GET-запрос в базу ${table}...`)

    return this.http.get(this.url + '/' + table)
      .pipe(map((data: any) => {return data}))
  }

  saveRequest(table: string, data: any) {

    console.log(`PUT-запрос в базу ${table}...`)

    this.http.put(this.url + '/' + table, data)
  }

  updateRequest(table: string, id: number) {

  }

  deleteRequest(table: string, id: number) {

  }

  saveRequestPlayer(data: IPlayer) {

  }

}
