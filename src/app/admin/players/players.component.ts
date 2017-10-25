import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Player } from '../adminInterface';
import { ActivatedRoute, Router } from "@angular/router";
import { JQuery } from "../../common/dto/jQuery";

declare var $: JQuery;
@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  players : Player;
  refresh:boolean = false;
  constructor(private adminService: AdminService,private route : ActivatedRoute) { }

  ngOnInit() {
    console.log('routeparams'+JSON.stringify(this.route.params));
    this.route.params.subscribe((res)=> this.refresh = res.refresh);
    this.getPlayers();
  }
  getPlayers(){
    this.adminService.getPlayers(this.refresh).subscribe((res: Player) =>{
      this.players = res;
      console.log('res----------------'+JSON.stringify(this.players));
      }
    );
  }
  deletePlayer(id){
    $.confirm({
        title: 'Confirm!',
        content: 'Simple confirm!',
        buttons: {
            delete: ()=> {
                 this.adminService.removePlayer(id).subscribe((res)=>{
                   this.refresh = true;
                  $.alert('Deleted!');
                  this.getPlayers();
                  console.log(res)});
            },
            cancel: () => {
                $.alert('Canceled!');
            }
        }
    });


    console.log('delete');
  }
}
