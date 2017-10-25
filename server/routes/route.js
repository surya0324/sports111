const express = require('express');
const router = express.Router();
const Tournament = require('../models/tournament-model');
const Team = require('../models/team-model');
const Player = require('../models/player-model');
const Match = require('../models/match-model');
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;

mongoose.connect('mongodb://localhost:27017/dbLearning', function(err){
    if (err) {
		console.log('Not connected to the database' + err);
	}
	else{
		console.log('Successfully connected to the database');
	}
});

//Tournament routes
router.get('/tournaments',function(req,res){
  Tournament.find({}).exec(function(err,tournaments){
      if(err)
        res.send(err);
      else{
        res.json(tournaments);
      }
       
    })
});

router.get('/tournaments/:id',function(req,res){
 Tournament.find({'_id':ObjectId(req.params.id)}).exec(function(err,tournament){
      if(err)
        res.send(err);
      else{
        res.json(tournament);
      }
        
    })
});

router.post('/tournaments',function(req,res){
  var newTournament = Tournament(req.body);
  newTournament.save(function(err,r) {
    if(err){
      res.send(err);
      console.log(err.message);
    }
    else{
      res.send(r);
    }
  });
});

router.put('/tournaments/:id', function(req, res){
  Tournament.findOneAndUpdate({_id:ObjectId(req.params.id)},
  {$set:{name:req.body.name,
        start_date: req.body.start_date,
        organizer:{name:req.body.name,contact: req.body.contact},
        tournament_fee : req.body.tournament_fee,
        tournamnt_format:{description:req.body.description,img: req.body.img},
        total_teams: req.body.total_teams,
        total_pools: req.body.total_pools,
        total_matches: req.body.total_matches,
        match_list:  req.body.match_list
  }},
  {new: true},
  (err,updatedTournament) => {
    if(err){
      res.send(err);
      console.log(err.message);
    }
    else{
      res.json(updatedTournament);
      console.log('updated tournament---'+JSON.stringify(updatedTournament));
    }

  });
})

router.get('/deleteTournament/:id',function(req,res){
  Tournament.remove({ _id: req.params.id }, function(err,r) {
    if (!err) {
            res.json(r);
    }
    else {
            res.send(err);
    }
});
})

//teams
router.get('/teams',function(req,res){
  Team.find({}).exec(function(err,teams){
      if(err)
        res.send(err);
      else
        res.json(teams);
    })
});

router.get('/teams/:id',function(req,res){
  Team.find({'_id':ObjectId(req.params.id)}).exec(function(err,team){
      if(err)
        res.send(err);
      else
        res.json(team);
    })
});

router.post('/teams',function(req,res){
  console.log('inside team add');
  var newTeam = Team({
    name: req.body.name,
    tournament_player_details: req.body.Player
  });
  newTeam.save(function(err,r) {
    if(err){
      res.send(err);
      console.log(err.message);
    }
    else{
      res.send(r);
    }
  });
});

router.put('/teams/:id', function(req, res){
  Team.findOneAndUpdate({_id:ObjectId(req.params.id)},
  {$set:{name:req.body.name,tournament_player_details: req.body.tournament_player_details}},
  {new: true},
  (err,updatedTeam) => {
    if(err){
      res.send(err);
      console.log(err.message);
    }
    else{
      res.json(updatedTeam);
    }

  });
})

//players
router.get('/players',function(req,res){
  Player.find({}).exec(function(err,players){
      if(err)
        res.send(err);
      else
        res.json(players);
    })
});

router.get('/players/:id',function(req,res){
  Player.findOne({'_id':ObjectId(req.params.id)}).exec(function(err,player){
      if(err)
        res.send(err);
      else{
        res.json(player);
      }

    })
});

router.post('/players',function(req,res){
  var newPlayer = Player({
    name: req.body.name,
    profile_pic: req.body.profile_pic,
    domain: req.body.domain
  });
  newPlayer.save(function(err,r) {
    if(err){
      res.send(err);
      console.log(err.message);
    }
    else{
      res.send(r);
    }
  });
});

router.put('/players/:id', function(req, res){
  Player.findOneAndUpdate({_id:ObjectId(req.params.id)},
  {$set:{name:req.body.name,profile_pic:req.body.profile_pic,domain:req.body.domain}},
  {new: true},
  (err,updatedPlayer) => {
    if(err){
      res.send(err);
      console.log(err.message);
    }
    else{
      res.json(updatedPlayer);
    }

  });
})
router.get('/deletePlayer/:id',function(req,res){
  Player.remove({ _id: req.params.id }, function(err,r) {
    if (!err) {
            res.json(r);
    }
    else {
            res.send(err);
    }
});
})
//Matches

router.get('/matches',function(req,res){
  Match.find({}).exec(function(err,matches){
      if(err)
        res.send(err);
      else{
        res.json(matches);
      }
       
    })
});

router.post('/matches',function(req,res){
  var newMatch = Match(req.body);
  newMatch.save(function(err,match) {
    if(err){
      res.send(err);
      console.log(err.message);
    }
    else{
      res.send(match);
   }
  });
});

router.get('/tournament/match/:id',function(req,res){
  Match.findOne({'_id':ObjectId(req.params.id)}).exec(function(err,match){
      if(err){
        res.send(err);
      }
      else{
        res.json(match);
      }

    })
});
module.exports = router;
