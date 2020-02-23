const router = require('express').Router();
const Show = require('../models/show.model')

router.route('/').get((req, res) => {
    Show.find()
    .then(shows => res.json(shows))
    .catch(err => res.json("Error: " + err))
});

router.route('/add').post((req, res) => {
    const newShow = new Show({
        name: req.body.name,
        total_episodes: req.body.total_episodes,
        created_by: req.body.created_by,
    })

    newShow.save()
        .then(() => res.json("Show added!"))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Show.findById(req.params.id)
    .then(show => res.json(show))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Show.findById(req.params.id)
    .then(() => res.json("Show deleted."))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Show.findById(req.params.id)
    .then(show => {
        show.name = req.body.name;
        show.total_episodes = req.body.total_episodes;
        show.created_by = req.body.created_by;

        show.save()
            .then(() => res.json("Show updated!"))
            .catch(err => res.status(400).json("Error: " + err));

    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;