import {Injectable} from "@angular/core";
import {IPlayer} from "../interfaces/player";
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

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

    console.log(`POST-запрос в базу ${table} данные ${data}`)

    return this.http.post(this.url + '/' + table, data)
  }

  updateRequest(table: string, id: number) {

  }

  deleteRequest(table: string, id: number) {
    return this.http.delete(this.url + '/' + table + '/' + id)
  }

  saveRequestPlayer(data: IPlayer) {

  }

}
