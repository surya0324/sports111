import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {ReplaySubject} from 'rxjs/Rx';
import { Tournament, Team, Player } from './adminInterface';
@Injectable()
export class AdminService {
  getTournament$ = new ReplaySubject<Array<Tournament>>();
  getTeam$ = new ReplaySubject<Team>();
  getPlayer$ = new ReplaySubject<Player>();
  getOnePlayer$ =  new ReplaySubject<Player>();
  private headers = new Headers({'content-type': 'application/json'});
  constructor(private _http: Http) { }
  getTournaments(refresh?: boolean) {
    if (refresh || !this.getTournament$.observers.length) {
        this._http.get('/api/tournaments')
        .map((res) => res.json())
        .subscribe((res) => this.getTournament$.next(res));
    }
      return this.getTournament$;
  }
  getTeams(refresh?: boolean) {
    if (refresh || !this.getTeam$.observers.length) {
      this._http.get('/api/teams')
      .map((res) => res.json())
      .subscribe((res) => this.getTeam$.next(res));
    }
    return this.getTeam$;
  }
  getTeam(id) {
    return this._http.get('/api/teams/'+id)
      .map((res) => res.json());

  }
  addTeam(team){
    return this._http.post('/api/teams',team)
    .map((res)=> res.json());
  }
  updateTeam(id,team){
    return this._http.put(`/api/teams/${id}`,JSON.stringify(team),{headers: this.headers})
    .map((res)=> res.json());
  }
  getPlayers(refresh?: boolean) {
    if (refresh || !this.getPlayer$.observers.length) {
       this._http.get('/api/players')
      .map((res) => res.json())
      .subscribe((res) => this.getPlayer$.next(res));
    }
    return this.getPlayer$;
  }
  getPlayer(id) {
    return this._http.get('/api/players/'+id)
      .map((res) => res.json());

  }
  addPlayers(player){
    return this._http.post('/api/players',player)
    .map((res)=> res.json());
  }
  updateplayers(id,player){
    return this._http.put(`/api/players/${id}`,JSON.stringify(player),{headers: this.headers})
    .map((res)=> res.json());
  }
  removePlayer(id){
    return this._http.get(`/api/deletePlayer/${id}`).map((res)=>res.json());
  }
  addTournament(tournament){
    return this._http.post('/api/tournaments',tournament)
    .map((res)=> res.json());
  }
  addMatch(match){
    return this._http.post('/api/matches',match)
    .map((res)=> res.json());
  }
  getTournamentMatch(id) {
    return this._http.get('/api/tournament/match/'+id)
    .map((res) => res.json());
 }
 getTournament(id) {
  return this._http.get('/api/tournaments/'+id)
  .map((res) => res.json());
}
updateTournament(id,tournament){
  return this._http.put(`/api/tournaments/${id}`,JSON.stringify(tournament),{headers: this.headers})
  .map((res)=> res.json());
}
removeTournament(id){
  return this._http.get(`/api/deleteTournament/${id}`).map((res)=>res.json());
}
}
