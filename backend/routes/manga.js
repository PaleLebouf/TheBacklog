const router = require('express').Router();
const Manga = require('../models/manga.model')

router.route('/').get((req, res) => {
    Manga.find()
    .then(manga => res.json(manga))
    .catch(err => res.json("Error: " + err))
});

router.route('/add').post((req, res) => {
    const newManga = new Manga({
        name: req.body.name,
        total_chapters: req.body.total_chapters,
        created_by: req.body.created_by,
    })

    newManga.save()
        .then(() => res.json("Manga added!"))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Manga.findById(req.params.id)
    .then(manga => res.json(manga))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Manga.findById(req.params.id)
    .then(() => res.json("Manga deleted."))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Manga.findById(req.params.id)
    .then(manga => {
        manga.name = req.body.name;
        manga.total_chapters = req.body.total_chapters;
        manga.created_by = req.body.created_by;

        manga.save()
            .then(() => res.json("Manga updated!"))
            .catch(err => res.status(400).json("Error: " + err));

    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router; 