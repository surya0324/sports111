import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LoginComponent } from './admin/login/login.component';
import { TournamentComponent } from './admin/tournaments/tournament.component';
import { TeamsComponent } from './admin/teams/teams.component';
import { PlayersComponent } from './admin/players/players.component';
import { AddTournamentComponent } from "./admin/tournaments/addTournament/add.tournament.component";
import { AddPlayerComponent } from "./admin/players/add-player/add-player.component";
import { AddTeamComponent } from "./admin/teams/add-team/add-team.component";

const admin_routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'tournaments', pathMatch: 'full' },
      {path: 'tournaments',
        children: [
          { path: '', component: TournamentComponent },
          { path: 'add', component: AddTournamentComponent},
          {path: ':id', component: AddTournamentComponent}
        ]
      },
      {path: 'tournaments/add', component: AddTournamentComponent},
      {path: 'teams',
        children: [
          { path: '', component: TeamsComponent },
          { path: 'add', component: AddTeamComponent},
          {path: ':id', component: AddTeamComponent}
        ]},
      { path: 'players',
        children: [
          { path: '', component: PlayersComponent },
          { path: 'add', component: AddPlayerComponent},
          {path: ':id', component: AddPlayerComponent}
        ]
      }
    ]},

];


export const admin_routing: ModuleWithProviders = RouterModule.forChild(admin_routes);
