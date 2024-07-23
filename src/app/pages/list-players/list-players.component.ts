import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpService} from "../../shared/services/httpService";
import {IPlayer} from "../../shared/interfaces/player";
import {FormPlayerComponent} from "./form-player/form-player.component";

@Component({
  selector: 'list-players',
  standalone: true,
  imports: [CommonModule, FormPlayerComponent],
  templateUrl: './list-players.component.html',
  styleUrl: './list-players.component.scss'
})
export class ListPlayersComponent {
  @Input() newPlayer: IPlayer = {
    name: '',
    number: null,
    position: [],
    batAndThrow: ''
  };
  @Input() isCloseForm: boolean;

  isSelectPlayer: boolean = false;
  isFormPlayerVisible: boolean = false;
  selectPlayer: IPlayer = {
    name: '',
    number: null,
    position: [],
    batAndThrow: ''
  };
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

  public editPlayersArray(newPlayer: IPlayer) {
    if (this.selectPlayer.id == newPlayer.id) {
      // Обновление существующего игрока
      this.selectPlayer = newPlayer
      const index = this.players.findIndex(item => item.id == this.selectPlayer.id)
      this.players[index] = newPlayer
    } else {
      // Добавление нового игрока
      this.players.push(newPlayer)
    }
    this.isFormPlayerVisible = false; // Закрытие формы редактирования
  }

  public showFormPlayer() {
    this.isFormPlayerVisible = true;
  }

  public deletePlayer() {
    if (this.selectPlayer.id) {
      this.httpService.deletePlayer(this.selectPlayer.id).subscribe(
        {next: (res) => {
        if (res) {
          this.players = this.players.filter(item => item.id !== this.selectPlayer.id)
          this.selectPlayer = {
            name: '',
            number: null,
            position: [],
            batAndThrow: ''
          }
          alert("Игрок удален")
        }
      }
        })
    }
  }

  public onSelectPlayer(player: IPlayer) {
    // Если клик по тому же игроку
    if (this.selectPlayer.id) {
      // или по другому игроку
      if (this.selectPlayer.id !== player.id) {
        this.isSelectPlayer = true
        this.selectPlayer = player
        return
      }
      this.isSelectPlayer = false
      this.selectPlayer = {
        name: '',
        number: null,
        position: [],
        batAndThrow: ''
      }
    } else {
    // Выбор игрока
      this.isSelectPlayer = true
      this.selectPlayer = player
    }
  }

}
