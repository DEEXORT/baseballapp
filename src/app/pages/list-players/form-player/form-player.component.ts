import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {IPlayer} from "../../../shared/interfaces/player";
import {NgxMaskDirective, provideNgxMask} from "ngx-mask";
import {inputAllowedCharactersDirective} from "../../../shared/directives/input-allowed-characters.directive";

@Component({
  selector: 'form-player',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective, inputAllowedCharactersDirective],
  providers: [provideNgxMask()],
  templateUrl: './form-player.component.html',
  styleUrl: './form-player.component.scss'
})
export class FormPlayerComponent {
  @Input() selectPlayer: IPlayer
  @Output() isCloseForm: EventEmitter<boolean> = new EventEmitter<boolean>

  formPlayer: FormGroup;

  public inputTransformFn = (value: unknown): string =>
    typeof value === 'string' ? value.toUpperCase() : String(value);

  constructor(private fb: FormBuilder) {
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
        '',
        [Validators.required,
        Validators.minLength(1)]],
      position: [
        '',
        [Validators.minLength(1)]],
    });
  }

  private _getPropertyForm(property: string) {
    return this.formPlayer.get(property)
  }

  public formValidator(propertyName: string): string {
    // Arguments: propertyName - имя формы, которую нужно провалидировать
    // Callback: наименование CSS-класса

    if (this._getPropertyForm(propertyName)?.valid && this._getPropertyForm(propertyName)?.dirty) {
      return 'input-valid'
    }
    if (this._getPropertyForm(propertyName)?.invalid && this._getPropertyForm(propertyName)?.dirty) {
      return 'input-invalid'
    }
    return ''
  }

  public closeForm() {
    this.isCloseForm.emit(true);
  }
}
