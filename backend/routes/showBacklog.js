const router = require('express').Router();
const ShowBacklog = require('../models/showBacklog.model');

router.route('/').get((req, res) => {
    ShowBacklog.find()
    .then(showBacklogs => res.json(showBacklogs))
    .catch(err => res.json("Error: " + err))
});

router.route('/add').post((req, res) => {
    const newShowBacklog = new ShowBacklog({
        key_id: req.body.user_id + req.body.game_id,
        user_id: req.body.user_id,
        game_id: req.body.game_id,
        progress: req.body.progress,
        in_progress: req.body.in_progress,
        completed: req.body.completed,
        rating: req.body.rating
    })

    newShowBacklog.save()
        .then(() => res.json("ShowBacklog added!"))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:userid/:gameid').get((req, res) => {
    ShowBacklog.findOne({
        user_id: req.params.userid,
        game_id: req.params.gameid,
    })
    .then(showBacklog => res.json(showBacklog))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:userid').get((req, res) => {
    ShowBacklog.find({
        user_id: req.params.userid,
    })
    .then(showBacklog => res.json(showBacklog))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:userid/:gameid').delete((req, res) => {
    ShowBacklog.findOneAndDelete({
        user_id: req.params.userid,
        game_id: req.params.gameid,
    })
    .then(() => res.json("ShowBacklog deleted."))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:userid/:gameid').post((req, res) => {
    ShowBacklog.findOneAndUpdate({key_id: req.params.userid + req.params.gameid})
        .then(showBacklog => {
        showBacklog.user_id = req.body.user_id;
        showBacklog.game_id = req.body.game_id;
        showBacklog.progress = req.body.progress;
        showBacklog.in_progress = req.body.in_progress;
        showBacklog.completed = req.body.completed;
        showBacklog.rating = req.body.rating;

        showBacklog.save()
            .then(() => res.json("ShowBacklog updated!"))
            .catch(err => res.status(400).json("Error: " + err));

    })
    .catch(err => res.status(400).json('Couldnt find: ' + err));
});

module.exports = router;