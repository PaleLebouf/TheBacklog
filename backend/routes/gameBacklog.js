const router = require('express').Router();
const GameBacklog = require('../models/gameBacklog.model');

router.route('/').get((req, res) => {
    GameBacklog.find()
    .then(gameBacklogs => res.json(gameBacklogs))
    .catch(err => res.json("Error: " + err))
});

router.route('/add').post((req, res) => {
    const newGameBacklog = new GameBacklog({
        key_id: req.body.user_id + req.body.game_id,
        user_id: req.body.user_id,
        game_id: req.body.game_id,
        progress: req.body.progress,
        in_progress: req.body.in_progress,
        completed: req.body.completed,
        rating: req.body.rating
    })

    newGameBacklog.save()
        .then(() => res.json("GameBacklog added!"))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:userid/:gameid').get((req, res) => {
    GameBacklog.findOne({
        user_id: req.params.userid,
        game_id: req.params.gameid,
    })
    .then(gameBacklog => res.json(gameBacklog))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/userBacklog/:userid').get((req, res) => {
    GameBacklog.find({
        user_id: req.params.userid,
    })
    .then(gameBacklog => res.json(gameBacklog))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:userid/:gameid').delete((req, res) => {
    GameBacklog.findOneAndDelete({
        user_id: req.params.userid,
        game_id: req.params.gameid,
    })
    .then(() => res.json("GameBacklog deleted."))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:userid/:gameid').post((req, res) => {
    GameBacklog.findOneAndUpdate({key_id: req.params.userid + req.params.gameid})
        .then(gameBacklog => {
        gameBacklog.user_id = req.body.user_id;
        gameBacklog.game_id = req.body.game_id;
        gameBacklog.progress = req.body.progress;
        gameBacklog.in_progress = req.body.in_progress;
        gameBacklog.completed = req.body.completed;
        gameBacklog.rating = req.body.rating;

        gameBacklog.save()
            .then(() => res.json("GameBacklog updated!"))
            .catch(err => res.status(400).json("Error: " + err));

    })
    .catch(err => res.status(400).json('Couldnt find: ' + err));
});

module.exports = router;