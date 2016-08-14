var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var WinnerSchema = new Schema({
    username: String,
    artistname: String,
    url: String,
    tracklist_fullmix: String,
    fullmix: Object,
    group: Number,
    votes: Number
});

mongoose.model('Winner', WinnerSchema);

