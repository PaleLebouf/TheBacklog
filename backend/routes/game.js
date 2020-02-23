const router = require('express').Router();
const Game = require('../models/game.model')

router.route('/').get((req, res) => {
    Game.find()
    .then(games => res.json(games))
    .catch(err => res.json("Error: " + err))
});

router.route('/add').post((req, res) => {
    const newGame = new Game({
        name: req.body.name,
        total_length: req.body.total_length,
        created_by: req.body.created_by,
    })

    newGame.save()
        .then(() => res.json("Game added!"))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Game.findById(req.params.id)
    .then(game => res.json(game))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Game.findById(req.params.id)
    .then(() => res.json("Game deleted."))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Game.findById(req.params.id)
    .then(game => {
        game.name = req.body.name;
        game.total_length = req.body.total_length;
        game.created_by = req.body.created_by;

        game.save()
            .then(() => res.json("Game updated!"))
            .catch(err => res.status(400).json("Error: " + err));

    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;