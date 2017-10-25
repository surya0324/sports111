import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import {MultiSelectModule} from 'primeng/primeng';
import {SelectItem} from 'primeng/primeng';
import { AdminService } from "../../admin.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Player } from "../../adminInterface";

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {
  profilepicPath: string = '';
  playerForm: FormGroup;
  player:Player;
  domains: SelectItem[]=[];
  domain: string[];
  profilepicname:string= '' ;
  addForm:Boolean = true;
  refreshPlayers:Boolean = false;
  constructor(private fb: FormBuilder,private adminService: AdminService,private route: ActivatedRoute, private router:Router) { }

  ngOnInit() {
    if(this.route.params['_value'].id != undefined){
      this.addForm = false;
    }
    this.domains.push({label:'Batsman',value:'batsman'});
    this.domains.push({label:'Bowler',value:'bowler'});
    this.domains.push({label:'Fielder',value:'fielder'});
    this.domains.push({label:'WicketKeeper',value:'wicketkeeper'});
    this.domains.push({label:'Captain',value:'captain'});
    this.domains.push({label:'All Rounder',value:'All rounder'});
    this.domains.push({label:'Vice-Captain',value:'vice-captain'});
    this.playerForm = this.fb.group({
          name : ['',Validators.required],
          domain : [[],Validators.required]
    })
    if(!this.addForm){
      this.adminService.getPlayer(this.route.params['_value'].id).subscribe((res:Player)=>{
      this.player = res;
      this.profilepicPath = `../../../../assets/images/${this.player.img}`;
      console.log('profilepicpath'+this.profilepicPath);
      this.createPlayerEditForm();
      })

    }

  }
  createPlayerEditForm(){
    console.log(this.player.player_name);
    this.playerForm = this.fb.group({
          name : [this.player.player_name,Validators.required],
          domain : [this.player.domain,Validators.required]
        })
  }
  onsubmit(){
     this.playerForm.value['profile_pic'] = this.profilepicname;
    if(this.addForm){
        console.log('form submitted'+JSON.stringify(this.playerForm.value));
    this.adminService.addPlayers(this.playerForm.value).subscribe((res)=>{
      console.log(res);
      this.refreshPlayers =  true;
    });
    }
  else{
    this.adminService.updateplayers(this.route.params['_value'].id,this.playerForm.value).subscribe((res)=>{
      console.log('update res----------'+JSON.stringify(res));
      this.refreshPlayers =  true;
    })
  }
  }
  chooseFile(event) {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (() => {
      const path = event.target.value;
      const array = path.split('\\');
      this.profilepicname = array.pop();
      this.profilepicPath = `../../../assets/images/${this.profilepicname}`;
    });
  }
}
