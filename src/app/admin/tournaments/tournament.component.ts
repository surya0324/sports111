import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Tournament } from '../adminInterface';
import { ActivatedRoute, Router } from "@angular/router";
import { JQuery } from "../../common/dto/jQuery";
declare var $: JQuery;
@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {
  tournaments: Array<Tournament>;
  refresh:boolean = false;
  constructor(private adminService: AdminService,private route : ActivatedRoute) { }
  ngOnInit() {
    this.route.params.subscribe((res)=> this.refresh = res.refresh);
    this.getTournaments();
  }

  getTournaments(){
    this.adminService.getTournaments(this.refresh).subscribe((res: Array<Tournament>) => {
      this.tournaments = res;
       console.log("All tournaments--------"+JSON.stringify(this.tournaments))
    });
  }
  deleteTournament(id){
    $.confirm({
        title: 'Confirm!',
        content: 'Simple confirm!',
        buttons: {
            delete: ()=> {
                 this.adminService.removeTournament(id).subscribe((res)=>{
                   this.refresh = true;
                  $.alert('Deleted!');
                  this.getTournaments();
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
