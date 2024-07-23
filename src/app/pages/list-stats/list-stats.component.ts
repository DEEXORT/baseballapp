import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormPlayerComponent} from "../list-players/form-player/form-player.component";
import {FormStatComponent} from "./form-stat/form-stat.component";
import {HttpService} from "../../shared/services/httpService";

@Component({
  selector: 'app-list-stats',
  standalone: true,
  imports: [CommonModule, FormPlayerComponent, FormStatComponent],
  templateUrl: './list-stats.component.html',
  styleUrl: './list-stats.component.scss'
})
export class ListStatsComponent {

  constructor(private http: HttpService) {
  }
  public deleteTables() {
    this.http.deleteAllTables()
  }
}
