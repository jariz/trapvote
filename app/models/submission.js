var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SubmissionSchema = new Schema({
    username: String,
    artistname: String,
    url: String,
    tracklist_teasermix: String,
    tracklist_fullmix: String,
    fullmix: Object,
    teasermix: Object,
    group: Number
});

mongoose.model('Submission', SubmissionSchema);

