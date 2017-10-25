import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SelectItem } from "primeng/primeng";
import { AdminService } from '../../admin.service';
import { Player, Team } from '../../adminInterface';
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {
  refreshteam: boolean = false;
  team: Team;
  addForm:Boolean = true;
  teamForm: FormGroup;
  playerList;
  players: SelectItem[]=[];
  constructor(private fb: FormBuilder, private adminService: AdminService,private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.route.params['_value'].id);
    if(this.route.params['_value'].id != undefined){
      this.addForm = false;
    }
    this.loadAssets();
    this.teamForm = this.fb.group({
          name : ['',Validators.required],
          Player : [[],Validators.required]
    })
  }

  loadAssets(){
    this.adminService.getPlayers().subscribe((res: Player) =>{
      console.log(JSON.stringify(res));
      this.playerList = res;
      for(let player of this.playerList){
          this.players.push({label: player.player_name, value:player._id});
      }
      }
    );

    if(!this.addForm){
      console.log(this.route.params['_value'].id);
      this.adminService.getTeam(this.route.params['_value'].id).subscribe((res:Team)=>{
      this.team = res[0];
      this.createTeamEditForm();
      })

    }
  }
  createTeamEditForm(){
    console.log(this.team);
   this.teamForm = this.fb.group({
          name : [this.team.team_name,Validators.required],
          Player : [this.team.player_list,Validators.required]
        })
  }
  onsubmit(){
    const payload={
      name: this.teamForm.value.name,
      logo: 'abc.jpg',
      tournament_player_details : [
        {
            "tournament_id" : null,
            "Players" : this.teamForm.value.Player
        }
      ]
    }
    if(this.addForm){
        console.log('form submitted'+JSON.stringify(this.teamForm.value));
    this.adminService.addTeam(payload).subscribe((res)=>{
      console.log(res);
      this.refreshteam =  true;
    });
    }
  else{
    this.adminService.updateTeam(this.route.params['_value'].id,payload).subscribe((res)=>{
      console.log('update res----------'+JSON.stringify(res));
      this.refreshteam =  true;
    })
  }
  }
}
