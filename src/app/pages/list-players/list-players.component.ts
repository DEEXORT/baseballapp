import {Component, Input, } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ModalDialogComponentComponent
} from "../../shared/components/modal-dialog-component/modal-dialog-component.component";
import {HttpService} from "../../shared/services/httpService";
import {IPlayer} from "../../shared/interfaces/player";
import {FormPlayerComponent} from "./form-player/form-player.component";

@Component({
  selector: 'list-players',
  standalone: true,
  imports: [CommonModule, ModalDialogComponentComponent, FormPlayerComponent],
  templateUrl: './list-players.component.html',
  styleUrl: './list-players.component.scss'
})
export class ListPlayersComponent {
  @Input() isConfirmed: boolean = false;
  @Input() isCloseForm: boolean = false;

  isSelectPlayer: boolean = false;
  selectPlayer: IPlayer;

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

  public showModalDialog() {
    this.isModalDialogVisible = true; // Временно
}

  public closeModalDialog() {
    this.isModalDialogVisible = false; // Временно
    this.isSelectPlayer = false;
    this.selectPlayer = {};
  }

  public onSelectPlayer(player: IPlayer) {
    this.selectPlayer = player;
    this.showModalDialog();
  }

}
