import {Component, EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfilePlayerComponent} from "./profile-player/profile-player.component";
import {IPlayer} from "../../interfaces/player";

@Component({
  selector: 'modal-dialog',
  standalone: true,
  imports: [CommonModule, ProfilePlayerComponent],
  templateUrl: './modal-dialog-component.component.html',
  styleUrl: './modal-dialog-component.component.scss'
})
export class ModalDialogComponentComponent {
  @Output() isConfirmed: EventEmitter<boolean> = new EventEmitter<boolean>;

  public savePlayer(player: IPlayer) {
    alert(player)
  }

  public closeModalDialog() {
    this.isConfirmed.emit(false)
  }
}
