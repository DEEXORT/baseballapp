import {Component, EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IPlayer} from "../../../interfaces/player";

@Component({
  selector: 'profile-player',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './profile-player.component.html',
  styleUrl: './profile-player.component.scss'
})
export class ProfilePlayerComponent {
  @Output() player: EventEmitter<IPlayer> = new EventEmitter<IPlayer>();
  playerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this._createForm();
  }

  ngOnInit() {
    this.playerForm.valueChanges.subscribe((value) => {
      console.log(value)})
  }

  public _createForm() {
    this.playerForm = this.fb.group({
      name: '',
      number: null,
      batAndThrow: '',
      position: ''
    })
  }

}
