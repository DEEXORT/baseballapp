import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {read, utils} from "xlsx";
import {HttpService} from "../../../shared/services/httpService";
import {IPlayer, IStatExcel, IStatPlayer} from "../../../shared/interfaces/player";
import {NgSelectModule} from "@ng-select/ng-select";
import {FormsModule} from "@angular/forms";
import {FormPlayerComponent} from "../../list-players/form-player/form-player.component";
import {StatSaveComponent} from "../stat-save/stat-save.component";

@Component({
  selector: 'form-stat',
  standalone: true,
  imports: [CommonModule, NgSelectModule, FormsModule, FormPlayerComponent, StatSaveComponent],
  templateUrl: './form-stat.component.html',
  styleUrl: './form-stat.component.scss'
})

export class FormStatComponent {
  // data: IStatPlayer[]
  data: IStatExcel[]
  // columnsHTMLTable
  columnsTable = {
    // number: '№',
    // name: 'Имя игрока',
    numberOfGames: 'Количество игр', pa: 'PA',
    run: 'R', rbi: 'RBI', bb: 'BB', hbp: 'HBP',
    oneB: '1B', twoB: '2B', threeB: '3B',
    so: 'SO', go: 'GO', fo: 'FO', ro: 'RO', hr: 'HR'
  }
  keysColumnExcelTable = ['namePlayer', 'numberOfGames', 'pa', 'run', 'rbi', 'bb', 'hbp', 'oneB', 'twoB', 'threeB',
  'so', 'go', 'fo', 'ro', 'hr']
  keysOfColumnsTable: any = []
  dbPlayers: IPlayer[] = []
  isFormPlayerVisible = false;
  isModalConfirmVisible = false;

  constructor(private httpService: HttpService) {
  }

  ngOnInit(){
    Object.keys(this.columnsTable).map(key => {
        this.keysOfColumnsTable.push(key)
    })

    // Получение списка игроков из БД
    this.getAllPlayers()
  }

  public getAllPlayers() {
    this.httpService.getRequest('players').subscribe({next: (data: IPlayer[]) => {
      this.dbPlayers = data;
      }})
  }

  public showFormPlayer() {
    this.isFormPlayerVisible = true
  }

  public editPlayersArray(newPlayer: IPlayer) {
    this.dbPlayers.push(newPlayer)
    console.log(this.dbPlayers)
    this.isFormPlayerVisible = false; // Закрытие формы редактирования
  }

  public onFileChange(event: any) {
    const
      file = event.target.files[0],
      fileReader = new FileReader()

    // Чтение файла (File) через FileReader
    fileReader.readAsArrayBuffer(file)

    fileReader.onload = (e: any) => {

      const
        ab = e.target.result,   // Создание ArrayBuffer после чтения файла
        wb = read(ab),  // Считывание книги (Workbook) из ArrayBuffer
        ws = wb.Sheets[wb.SheetNames[0]]  // Создание листа (Sheet)

      // Добавление заголовков в таблицу
      utils.sheet_add_aoa(ws, [this.keysColumnExcelTable], {origin: "A1"});

      // Предпоказ таблицы перед сохранением в БД
      this.data = utils.sheet_to_json(ws) // Создание массива объектов с данными из таблицы

      console.log(this.data[0])
    }
  }

  public strToKey(value: string) {
    return value as keyof IStatPlayer
  }

  // Проверка
  public checkIStatPlayer(player: IStatExcel) {
    console.log(player)

  }

  public saveTable() {

    // Появляется модальное окно, где нужно указать имя протокола и год сезона

    // Проверка на наличие всех игроков в БД
    // ...

    // HTTP-запрос на сохранение в БД (stats)
    // ...

    this.isModalConfirmVisible = true

  }

  protected readonly Object = Object;
  protected readonly name = name;
}
