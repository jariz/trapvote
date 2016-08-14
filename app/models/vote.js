var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var VoteSchema = new Schema({
    submission: Schema.Types.ObjectId,
    date: Date,
    ip: String,
    isWinnersVote: Boolean
});

mongoose.model('Vote', VoteSchema);

