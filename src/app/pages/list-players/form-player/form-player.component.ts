import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {IPlayer} from "../../../shared/interfaces/player";
import {NgxMaskDirective, provideNgxMask} from "ngx-mask";
import {NgSelectModule} from "@ng-select/ng-select";
import {last} from "rxjs";
import {HttpService} from "../../../shared/services/httpService";

@Component({
  selector: 'form-player',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective, NgSelectModule, FormsModule],
  providers: [provideNgxMask()],
  templateUrl: './form-player.component.html',
  styleUrl: './form-player.component.scss'
})
export class FormPlayerComponent {
  @Input() selectPlayer: IPlayer
  @Output() selectPlayerChange: EventEmitter<IPlayer> = new EventEmitter<IPlayer>
  @Output() isCloseForm: EventEmitter<boolean> = new EventEmitter<boolean>

  formPlayer: FormGroup;
  positionOptions = ['P', 'C', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF'];

  public inputTransformFn = (value: unknown): string =>
    typeof value === 'string' ? value.toUpperCase() : String(value);

  constructor(private fb: FormBuilder, private httpService: HttpService) {
    this._createForm()
  }

  ngOnInit() {
    console.log('Запуск компонента FormPlayer')
    this.formPlayer.valueChanges.subscribe((v) => {
      console.log(v)});

    if (this.selectPlayer) {
      this.formPlayer.patchValue(this.selectPlayer)
    }
  }


  private _createForm() {
    this.formPlayer = this.fb.group({
      name: [
        '',
        [Validators.required,
        Validators.minLength(5)]],
      number: [
        null,
        [Validators.min(0)]],
      batAndThrow: [
        "",
        [Validators.required,
        Validators.pattern('[rRlL/]*')]],
      position: [
        [],
        [Validators.minLength(1)]],
    });
  }

  private _getPropertyForm(property: string) {
    return this.formPlayer.get(property)
  }

  public cssFormValidator(nameForm: string): string {
    // Arguments: nameForm - имя формы, которую нужно провалидировать
    // Callback: наименование CSS-класса

    if (this._getPropertyForm(nameForm)?.valid && this._getPropertyForm(nameForm)?.dirty) {
      return 'input-valid'
    }
    if (this._getPropertyForm(nameForm)?.invalid && this._getPropertyForm(nameForm)?.dirty) {
      return 'input-invalid'
    }
    return ''
  }

  public saveToDatabase() {
    // Добавление нового игрока в БД
   this.httpService.saveRequest('players', this.formPlayer.value).subscribe({
       next: result => {
         this.formPlayer.patchValue(result)
         alert("Игрок добавлен")
         // Отправка добавленного игрока в лист игроков
         this.selectPlayerChange.emit(result)
         // Закрытие окна
         this.closeForm()
       }
   })
  }

  public closeForm() {
    this.isCloseForm.emit(true);
  }

  protected readonly last = last;
}
