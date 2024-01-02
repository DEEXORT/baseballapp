import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {IPlayer} from "../../../shared/interfaces/player";

@Component({
  selector: 'form-player',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-player.component.html',
  styleUrl: './form-player.component.scss'
})
export class FormPlayerComponent {
  @Input() selectPlayer: IPlayer
  @Output() isCloseForm: EventEmitter<boolean> = new EventEmitter<boolean>

  formPlayer: FormGroup;

  constructor(private fb: FormBuilder) {
    this._createForm()
  }

  ngOnInit() {
    console.log('Запуск компонента FormPlayer')
    this.formPlayer.valueChanges.subscribe((v) => {
      console.log(v)});
    console.log(this.selectPlayer)
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
      number: null,
      batAndThrow: '',
      position: ''
    });
  }

  get _namePlayer() {
    return this.formPlayer.get('name')
  }

  public validatorNamePlayer(): string {
    if (this._namePlayer?.valid && this._namePlayer?.dirty) {
      return 'input-valid'
    }
    if (this._namePlayer?.invalid && this._namePlayer?.dirty) {
      return 'input-invalid'
    }
    return ''
  }

  public closeForm() {
    this.isCloseForm.emit(true);
  }
}
