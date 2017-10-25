const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const tournamentSchema = new Schema({
    "name" : {
        type : String,
        required : true
    },
    "status" : {
        type : String,
        required : true
    },
    "start_date" : {
        type : Date,
        required : true
    },
    "organizer" : {
        "name" : {
            type : String,
            required : true
        },
        "contact" : {
            type : String,
            required : true
        }
    },
    "total_matches" : {
        type : Number,
        required : true
    },
    "ground_name" : {
        type : String,
        required : true
    },
    "tournament_fee" : {
        type : Number,
        required : true
    },
    "tournamnt_format" : {
        "description" : {
            type : String,
            required : true
        },
        "img" : {
            type : String
        }
    },
    "tournament_logo" : {
        type : String
    },
    "total_teams" : {
        type : Number,
        required : true
    },
    "total_pools" : {
        type : Number,
        required : true
    },
    "pools_list" : [ 
        {
            "team_name" : String,
            "team_id" : Schema.Types.ObjectId
        }
    ],
    "match_list" : [ {
        type : Schema.Types.ObjectId ,
        required : true
    }]
});

module.exports = mongoose.model('tournament',tournamentSchema, 'tournaments' );
