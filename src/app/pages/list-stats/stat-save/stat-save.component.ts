import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {IStatExcel, IStatPlayer} from "../../../shared/interfaces/player";
import {HttpService} from "../../../shared/services/httpService";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Component({
  selector: 'stat-save',
  standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './stat-save.component.html',
  styleUrl: './stat-save.component.scss'
})
export class StatSaveComponent {
  @Input() table: IStatExcel[] = [];
  @Output() isCloseForm: EventEmitter<boolean> = new EventEmitter<boolean>()

  formTable: FormGroup
  listYears: number[] = []

  constructor(private fb: FormBuilder, private http: HttpService) {
  }

  ngOnInit() {
    this._createForm()
    let currentYear = new Date( Date.now() ).getFullYear(),
        numberOfYears = 5

    for (let i = 0; i < numberOfYears; i++) {
      this.listYears.push(currentYear - i)
    }

    this.formTable.valueChanges.subscribe((res:any) => {
      console.log(res)})

  }

  private _createForm() {
    this.formTable = this.fb.group({
      id: 0,
      nameStatTable: [
        '',
        [Validators.required,
        Validators.minLength(5)]
      ],
      date: [
        0,
        [Validators.required]
      ]
    })
  }

  public saveTable() {

    console.log(this.formTable.value)

    this.http.saveTable(this.formTable.value).subscribe(result => {

      // Присвоение форме и статистикам игроков id таблицы
      this.formTable.patchValue(result);

      this.table.forEach(item => {
        item.tableId = this.formTable.value.id
      })

      // Сохранение статистик в БД "stats"
      if (this.formTable.value.id) {
        const stat: IStatPlayer[] = this.table;
        this.http.saveStatsPlayer(stat).subscribe(result => {
          console.log(result)
        })
      }

    })

  }

  // Закрытие модульного окна
  public cancelSave() {
    this.isCloseForm.emit(true)
  }

}
