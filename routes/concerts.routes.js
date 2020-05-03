// concerts.routes.js

const express = require('express');
const router = express.Router();
const db = require('./../db');

// endpoint for concerts

router.route('/concerts').get((req, res) => {
    res.json(db.concerts);
})

router.route('/concerts/:id').get((req, res) => {
    const id = parseInt(req.params.id) - 1;
    res.json(db.concerts[id]);
})

router.route('/concerts').post((req, res) => {
    db.concerts.push({
        id: db.concerts.length + 1,
        performer: req.body.performer,
        genre: req.body.genre,
        price: req.body.price,
        day: req.body.day,
        image: req.body.image,
    })
    res.send({ message: 'OK' });
})

router.route('/concerts/:id').put((req, res) => {
    const id = parseInt(req.params.id);

    db.concerts.forEach((item, i) => {
        if (item.id === id)
            db.concerts[i] = {
                id: id,
                performer: req.body.performer,
                genre: req.body.genre,
                price: req.body.price,
                day: req.body.day,
                image: req.body.image,
            };

        res.send({ message: 'OK' });
    })
})

router.route('/concerts/:id').delete((req, res) => {
    const id = parseInt(req.params.id);

    db.concerts.splice(db.concerts.findIndex(item => item.id === id), 1);

    res.send({ message: 'OK' });
})

module.exports = router;