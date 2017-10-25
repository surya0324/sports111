export interface Tournament {
  _id: string;
  name: string;
  status: string;
  start_Date: Date;
  organiser : {
    name : string;
    contact : string;
  };
  Matches: [{
    match_id: string;
    team1: string;
    team2: string;
    Venue: {
      ground_name: string;
      city: string;
    };
    time: string;
    date: Date;
    status: string,
    }];
}
export interface Team {
  _id: string;
  team_name: string;
  player_list : Array<string>;
}
export interface Player {
  _id: string;
  player_name: string;
  img: string;
  domain: Array<string>;
}
export interface Match {
  match_id: string;
  team1: string;
  team2: string;
  Venue: {
    ground_name: string;
    city: string;
    country: string;
  };
  time: string;
  date: Date;
  status: string;
  result: [
    {
        id: string;
        score: number;
    }
  ];
}
