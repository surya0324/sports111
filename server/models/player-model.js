const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const playerSchema = new Schema({
    "player_name" : String,
    "img" : String,
    "total_match_played" : Number,
    "domain" : [ 
        String
    ],
    "score_card" : {
        "Batting" : {
            "balls_faced" : Number,
            "runs_scored" : Number,
            "strike_rate" : Number,
            "sixes" : Number,
            "fours" : Number,
            "not_out" :Number,
            "century" : Number,
            "half-century" : Number
        },
        "Bowling" : {
            "overs" : Number,
            "runs" : Number,
            "economy" : Number,
            "wickets" : Number,
            "maiden" : Number,
            "hatrick" : Number,
            "5-wicket" : Number
        },
        "Fielding" : {
            "catches" : Number,
            "drop_catches" : Number,
            "run_out" : Number,
            "stumps" : Number
        }
    }
});

module.exports = mongoose.model('player',playerSchema, 'players' );
