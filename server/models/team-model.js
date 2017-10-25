const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const teamSchema = new Schema({
    "team_name" : String,
    "captain_name" : String,
    "contact_no" : String,
    "location" : String,
    "player_list" : [ 
        Schema.Types.ObjectId
    ],
    "total_match_played" : Number,
    "total_win" : Number,
    "total_players" : Number
});

module.exports = mongoose.model('team',teamSchema, 'teams' );
