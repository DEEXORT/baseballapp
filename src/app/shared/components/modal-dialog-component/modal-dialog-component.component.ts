import {Component, EventEmitter, Input, Output} from '@angular/core';
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
  @Input() selectPlayer: IPlayer // Получение игрока из ListPlayersComponent

  ngOnInit() {
    console.log(this.selectPlayer)
  }

  public savePlayer(player: IPlayer) {
    alert(player)
  }

  public closeModalDialog() {
    this.isConfirmed.emit(false)
  }
}
