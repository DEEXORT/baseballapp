import {Component, Input, ViewChild,} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ModalDialogComponentComponent
} from "../../shared/components/modal-dialog-component/modal-dialog-component.component";
import {HttpService} from "../../shared/services/httpService";
import {IPlayer} from "../../shared/interfaces/player";
import {FormPlayerComponent} from "./form-player/form-player.component";

interface ICloseForm {
  action: string
}

@Component({
  selector: 'list-players',
  standalone: true,
  imports: [CommonModule, ModalDialogComponentComponent, FormPlayerComponent],
  templateUrl: './list-players.component.html',
  styleUrl: './list-players.component.scss'
})
export class ListPlayersComponent {
  @Input() isConfirmed: boolean = false;
  // @Input() isCloseForm: boolean = false;
  @Input() isCloseForm: boolean;
  @Input() playerFromForm: IPlayer;

  isSelectPlayer: boolean = false;
  selectPlayer: IPlayer;
  prevSelectPlayer: IPlayer;

  public isModalDialogVisible: boolean = false;
  players: IPlayer[] = [];

  constructor(private httpService: HttpService) {
  }

  ngOnInit() {
    this.getAllPlayers();
  }

  public getAllPlayers() {
    this.httpService.getRequest('players').subscribe({next: (data: IPlayer[]) => {
      this.players = data;
    }});
  }

  public addPlayer() {
    this.isModalDialogVisible = true; // Временно
}

  public editPlayer() {
    this.isModalDialogVisible = true; // Временно
  }

  public deletePlayer() {
    if (this.selectPlayer.id) {
      this.httpService.deleteRequest('players', this.selectPlayer.id).subscribe((res) => {
        if (res) {
          console.log(res)
          console.log(this.selectPlayer.id)
          this.players = this.players.filter(item => item.id !== this.selectPlayer.id)
          alert("Игрок удален")
        }
      })
    }
  }

  public closeFormPlayer() {
    this.isModalDialogVisible = false; // Временно
    console.log(this.selectPlayer)

    // Если игрок отредактирован, то...

    // Если игрок добавлен, то ...
    if (this.prevSelectPlayer != this.selectPlayer) {

    }
    // Если действий не было, то ...

    this.isSelectPlayer = false;
    this.selectPlayer = {};
  }

  public onSelectPlayer(player: IPlayer) {
    this.selectPlayer = player;
  }

}
