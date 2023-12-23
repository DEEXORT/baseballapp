import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ModalDialogComponentComponent
} from "../../shared/components/modal-dialog-component/modal-dialog-component.component";
import {HttpService} from "../../shared/services/httpService";
import {IPlayer} from "../../shared/interfaces/player";

@Component({
  selector: 'list-players',
  standalone: true,
  imports: [CommonModule, ModalDialogComponentComponent],
  templateUrl: './list-players.component.html',
  styleUrl: './list-players.component.scss'
})
export class ListPlayersComponent {
  @Input() isConfirmed: boolean = false;
  public isModalDialogVisible: boolean = false;
  players: IPlayer[] = []

  constructor(private httpService: HttpService) {
  }

  ngOnInit() {
    this.getAllPlayers();
  }

  public getAllPlayers() {
    this.httpService.getPlayers('players').subscribe({next: (data: IPlayer[]) => {this.players = data}});
  }

  public showModalDialog() {
    this.isModalDialogVisible = true;
}

  public closeModalDialog() {
    this.isModalDialogVisible = false;
  }

}
