const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const matchSchema = new Schema({
    "team1_id" :{
        type :Schema.Types.ObjectId,
        required:true
    },
    "team2_id" :{
        type :  Schema.Types.ObjectId,
        required : true
    },
    "date" :{
        type : Date,
        required: true
    },
    "time" :{
        type : String,
        required : true
    },
    "ground" :{
        type : String,
        required : true
    },
    "match_type" : {
        type : String,
        required : true
    },
    "toss_won" : Schema.Types.ObjectId,
    "score_card" : [ 
        {
            "team1_id" : Schema.Types.ObjectId,
            "total_score" : Number,
            "extras" : {
                "wide_balls" : Number,
                "no_balls" : Number
            },
            "scores" : [ 
                {
                    "player_id" : Schema.Types.ObjectId,
                    "batting" : {
                        "runs_scored" : Number,
                        "balls_faced" : Number,
                        "six" : Number,
                        "four" : Number,
                        "strike_rate" : Number,
                        "not_out" : Boolean
                    },
                    "bowling" : {
                        "overs" : Number,
                        "runs" : Number,
                        "economy" : Number,
                        "wickets" : Number,
                        "maiden" : Number
                    },
                    "fielding" : {
                        "catches" : Number,
                        "drop_catches" : Number,
                        "run_out" : Number,
                        "stumps" : Number
                    }
                }
            ]
        }
    ]
   
});

module.exports = mongoose.model('match',matchSchema, 'matches' );
