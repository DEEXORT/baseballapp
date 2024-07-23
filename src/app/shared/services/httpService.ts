import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {IPlayer, IStatPlayer, ITable} from "../interfaces/player";

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

  savePlayer(data: IPlayer): Observable<IPlayer> {

    console.log(`POST-запрос в базу 'players' данные ${data}`)

    return this.http.post<IPlayer>(this.url + '/players', data)
  }

  // Сохранение таблицы (id, дата, имя)
  saveTable(data: ITable): Observable<ITable> {
    console.log(`POST-запрос в базу 'tables' данные ${data}`)
    return this.http.post<ITable>(this.url + '/tables', data)
  }

  // Сохранение статистик игроков
  saveStatsPlayer(data: IStatPlayer[]): Observable<IStatPlayer[]> {
    console.log(`POST-запрос в базу 'stats' данные ${data}`)
    return this.http.post<IStatPlayer[]>(this.url + '/stats', data)
  }

  // Обновление игрока
  updatePlayer(table: string, data: any): Observable<IPlayer> {
    return this.http.put<IPlayer>(this.url + '/' + table + '/' + data.id, data)
  }

  // Удаление игрока
  deletePlayer(id: number) {
    return this.http.delete(this.url + '/players' + '/' + id)
  }

  deleteAllTables() {
    if (confirm('Удалить все данные в БД tables?')) {
      this.http.get(this.url + '/tables')
        .pipe(map((data: any) => {return data}))
        .subscribe({
          next: response => {
            response.forEach( (item: any) => {
              console.log(item.id)
              try {
                this.http.delete(this.url + '/tables/' + item.id)
              } catch (e) {
                alert('Ошибка')
              }
            })
          }}
        )
    }
  }

}
