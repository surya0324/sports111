import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Team } from '../adminInterface';
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: 'app-team',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teams : Team;
  refresh:boolean = false;
  constructor(private adminService: AdminService,private route : ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((res)=> this.refresh = res.refresh);
    this.getTeams();

  }
  getTeams(){
    this.adminService.getTeams(this.refresh).subscribe((res: Team) => this.teams = res);
  }
}
