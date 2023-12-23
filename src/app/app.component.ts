import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {ListPlayersComponent} from "./pages/list-players/list-players.component";
import {NavigationComponent} from "./navigation/navigation.component";
import {HttpService} from "./shared/services/httpService";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ListPlayersComponent, NavigationComponent, HttpClientModule],
  providers: [HttpService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'BaseballApp';
}
