const router = require('express').Router();
const MangaBacklog = require('../models/mangaBacklog.model');

router.route('/').get((req, res) => {
    MangaBacklog.find()
    .then(mangaBacklogs => res.json(mangaBacklogs))
    .catch(err => res.json("Error: " + err))
});

router.route('/add').post((req, res) => {
    const newMangaBacklog = new MangaBacklog({
        key_id: req.body.user_id + req.body.game_id,
        user_id: req.body.user_id,
        game_id: req.body.game_id,
        progress: req.body.progress,
        in_progress: req.body.in_progress,
        completed: req.body.completed,
        rating: req.body.rating
    })

    newMangaBacklog.save()
        .then(() => res.json("MangaBacklog added!"))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:userid/:gameid').get((req, res) => {
    MangaBacklog.findOne({
        user_id: req.params.userid,
        game_id: req.params.gameid,
    })
    .then(mangaBacklog => res.json(mangaBacklog))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/userBacklog/:userid').get((req, res) => {
    MangaBacklog.find({
        user_id: req.params.userid,
    })
    .then(mangaBacklog => res.json(mangaBacklog))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:userid/:gameid').delete((req, res) => {
    MangaBacklog.findOneAndDelete({
        user_id: req.params.userid,
        game_id: req.params.gameid,
    })
    .then(() => res.json("MangaBacklog deleted."))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:userid/:gameid').post((req, res) => {
    MangaBacklog.findOneAndUpdate({key_id: req.params.userid + req.params.gameid})
        .then(mangaBacklog => {
        mangaBacklog.user_id = req.body.user_id;
        mangaBacklog.game_id = req.body.game_id;
        mangaBacklog.progress = req.body.progress;
        mangaBacklog.in_progress = req.body.in_progress;
        mangaBacklog.completed = req.body.completed;
        mangaBacklog.rating = req.body.rating;

        mangaBacklog.save()
            .then(() => res.json("MangaBacklog updated!"))
            .catch(err => res.status(400).json("Error: " + err));

    })
    .catch(err => res.status(400).json('Couldnt find: ' + err));
});

module.exports = router;