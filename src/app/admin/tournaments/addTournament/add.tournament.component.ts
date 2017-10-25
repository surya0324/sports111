import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf, NgFor } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { AdminService } from "../../admin.service";
import { Tournament, Team } from '../../adminInterface';
import { ActivatedRoute, Router } from "@angular/router";
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-add-tournament',
  templateUrl: './add.tournament.component.html',
  styleUrls: ['./add.tournament.component.css']
})
export class AddTournamentComponent implements OnInit {
  tournamentForm: FormGroup;
  tourImg:string='';
  poolForm: FormGroup;
  addForm:Boolean = true;
  tournaments;
  matchData;
  matchDetail:Array<any> = [];
  match_list : Array<string> = [];
  teams : Team;
  refresh:Boolean = false;
  constructor(private fb: FormBuilder, private adminService: AdminService, private route : ActivatedRoute,private datePipe: DatePipe) { }
  ngOnInit() {
    console.log(this.route.params['_value'].id);
    if(this.route.params['_value'].id != undefined){
      this.addForm = false;
    }
    this.InitForm();
    this.route.params.subscribe((res)=> this.refresh = res.refresh);
    this.getTeams();
    if(!this.addForm){
      console.log(this.route.params['_value'].id);
      this.createEditForm();
    }
  }

  getTeams(){
    this.adminService.getTeams().subscribe((res: Team) => {
      this.teams = res;
    });
  }

 

  onAddMatch(matchDataValue) {
    this.matchData = matchDataValue;
    this.matchData.status = "Open";
    console.log(this.matchData);
    this.adminService.addMatch(this.matchData).subscribe((res)=>{
        let matchId = res._id;
        this.match_list.push(matchId);
        console.log('match list--------'+this.match_list)
        for(let i of this.match_list){
          if(i != undefined){
            this.adminService.getTournamentMatch(i).subscribe((res)=>{
              this.matchDetail.push(res);
              console.log(this.matchDetail);
           });
          }
          
        }
    });
    // const control = <FormArray>this.tournamentForm.controls['matches'];
    // control.push(this.initMatches());
  }

  InitForm() {
    this.tournamentForm = this.fb.group({
      name: ['', Validators.required],
      start_date: ['', Validators.required],
      organizer: this.fb.group({
        name : ['', Validators.required],
        contact: ['', Validators.required]
      }),
      ground_name: ['', Validators.required],
      tournament_fee: ['', Validators.required],
      tournamnt_format: this.fb.group({
        description : ['', Validators.required],
        img: ['', Validators.required]
      }),
      total_teams: ['',Validators.required],
      total_pools: ['',Validators.required],
      total_matches: ['',Validators.required]
    });
    // this.poolForm = this.fb.group({
    //   total_teams: ['',Validators.required],
    //   total_pools: ['',Validators.required]
    // })
  }
  
  createEditForm(){
    this.adminService.getTournament(this.route.params['_value'].id).subscribe((res)=>{
      this.tournaments = res[0];
      let startDate = this.datePipe.transform(this.tournaments.start_date, 'yyyy-MM-dd');
      this.tournamentForm = this.fb.group({
          name: [this.tournaments.name, Validators.required],
          start_date: [startDate, Validators.required],
          organizer: this.fb.group({
            name : [this.tournaments.organizer.name, Validators.required],
            contact: [this.tournaments.organizer.contact, Validators.required]
          }),
          tournament_fee: [this.tournaments.tournament_fee, Validators.required],
          ground_name: [this.tournaments.ground_name, Validators.required],
          tournamnt_format: this.fb.group({
            description : [this.tournaments.tournamnt_format.description, Validators.required],
            img: ['', Validators.required]
          }),
          total_teams: [this.tournaments.total_teams,Validators.required],
          total_pools: [this.tournaments.total_pools,Validators.required],
          total_matches: [this.tournaments.total_matches,Validators.required]
        });
        this.match_list = this.tournaments.match_list;
        for(let i of this.match_list){
          if(i != undefined){
            this.adminService.getTournamentMatch(i).subscribe((res)=>{
              this.matchDetail.push(res);
           });
          }
          
        }

      })
  }

  createPool(){
    console.log(this.poolForm.value.total_teams);
    console.log(this.poolForm.value.total_pools);

  }
  // initMatches() {
  //   return this.fb.group({
  //       team1: [this.matchData.teamOneName, Validators.required],
  //       team2: [this.matchData.teamTwoName, Validators.required],
  //       ground_name : [this.matchData.groundname, Validators.required],
  //       time: [this.matchData.startTime, Validators.required],
  //       date: [this.matchData.date, Validators.required],
  //       matchType: [this.matchData.matchType, Validators.required]
  //     })
  // }
  chooseFile(event) {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (() => {
      const path = event.target.value;
      const array = path.split('\\');
      this.tourImg = array.pop();
     });
  }

  addTournament(){
    let tournamentObj = this.tournamentForm.value;
    tournamentObj.status = "Open";
    tournamentObj.match_list = this.match_list;
    tournamentObj.tournament_logo = this.tourImg;
    if(this.addForm){
      this.adminService.addTournament(tournamentObj).subscribe((res)=>{
        this.refresh =  true;
      });
    }
    else{
      console.log('else--------'+JSON.stringify(tournamentObj));
      console.log(this.route.params['_value'].id);
      this.adminService.updateTournament(this.route.params['_value'].id,tournamentObj).subscribe((res)=>{
        console.log('update res----------'+JSON.stringify(res));
        this.refresh =  true;
      })
    }
 }

}
