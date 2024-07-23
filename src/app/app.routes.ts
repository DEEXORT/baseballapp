import { Routes } from '@angular/router';
import {ListPlayersComponent} from "./pages/list-players/list-players.component";
import {ListStatsComponent} from "./pages/list-stats/list-stats.component";

export const routes: Routes = [
  {path: 'players', component: ListPlayersComponent},
  {path: 'stats-edit', component: ListStatsComponent}
];
