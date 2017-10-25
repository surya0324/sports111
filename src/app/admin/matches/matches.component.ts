import { Component, OnInit } from '@angular/core';
import { AdminService } from "../admin.service";
import { Match, Tournament } from '../adminInterface';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  matches: Array<any>= [];
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getTournaments().subscribe((res: Array<Tournament>) => {
      for(let tournament of res){
        for(let match of tournament.Matches){
          match['tournament_id'] = tournament._id;
          match['tournament_name'] = tournament.name;
          this.matches.push(match);
        }
      }
    });

  }

}
