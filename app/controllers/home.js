var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Submission = mongoose.model('Submission'),
    Vote = mongoose.model('Vote'),
    Winner = mongoose.model('Winner'),
    Chance = require('chance'),
    chance = new Chance(),
    config = require('../../config/config')

module.exports = function (app) {
    app.use('/', router);
};

router.get('/', function (req, res, next) {
    res.render('index', {
        title: '/r/trap - half year competition',
        round: config.round,
        winnersMode: config.winnersMode
    });
});

router.get('/api/submissions', function (req, res, next) {
    var limit = config.amountPerGroup * (config.tillGroup),
        skip = config.amountPerGroup * (config.fromGroup - 1);

    var builder = (!config.winnersMode ? Submission : Winner)
        .aggregate([{
            $sort: {
                group: 1
            }
        }])

    if (!config.winnersMode) {
        builder = builder
            .limit(limit)
            .skip(skip)
    }

    builder.exec(function (err, docs) {
        var submissions = []
        docs.forEach(function (doc) {
            submissions.push({
                id: doc._id,
                url: "https://vote.trapped.io/cdn/" + (!config.winnersMode ? doc.teasermix.filename : doc.fullmix.filename),
                tracklist: !config.winnersMode ? doc.tracklist_teasermix : doc.tracklist_fullmix,
            })
        })
        res.json(chance.shuffle(submissions))
    })
})

router.post('/api/submissions/upvote', function (req, res, next) {
    req.checkBody("submission").isMongoId();

    if (req.validationErrors()) {
        res.send({
            error: true,
            errors: req.validationErrors()
        })
    } else {
        (!config.winnersMode ? Submission : Winner).findById(req.body.submission, function (err, submission) {
            if (!err && submission) {
                var vote = new Vote()
                vote.ip = req.ip;
                vote.date = new Date;
                vote.submission = submission._id;
                vote.isWinnersVote = config.winnersMode;
                vote.save(function (err) {
                    if (!err) {
                        res.send({
                            success: true
                        })
                    } else {
                        console.log(err)
                        res.send({
                            error: true
                        })
                    }
                })
            } else {
                res.send({
                    error: true
                })
            }
        })


    }
});
