import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {HttpModule} from '@angular/http';
import { admin_routing } from './admin-routing.module';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LoginComponent } from './admin/login/login.component';
import { TournamentComponent } from './admin/tournaments/tournament.component';
import { TeamsComponent } from './admin/teams/teams.component';
import { PlayersComponent } from './admin/players/players.component';
import { AdminService } from './admin/admin.service';
import {FormsModule,  ReactiveFormsModule} from '@angular/forms';
import { MultiSelectModule } from 'primeng/primeng';
import { AddTournamentComponent } from './admin/tournaments/addTournament/add.tournament.component';
import { AddPlayerComponent } from "./admin/players/add-player/add-player.component";
import { AddTeamComponent } from "./admin/teams/add-team/add-team.component";

@NgModule({
  imports: [admin_routing, 
            HttpModule, 
            FormsModule, 
            ReactiveFormsModule,
            CommonModule,
            MultiSelectModule],
  declarations: [DashboardComponent, LoginComponent, TournamentComponent,
                 TeamsComponent, PlayersComponent,
                 AddTournamentComponent,AddPlayerComponent,AddTeamComponent
                ],
  providers: [AdminService,DatePipe]
})
export class AdminLazyModule {}
