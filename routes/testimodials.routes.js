// testimonials.routes.js

const express = require('express');
const router = express.Router();
const db = require('./../db');


router.route('/testimonials').get((req, res) => {
    res.json(db.testimonials);
})

router.route('/testimonials/random').get((req, res) => {
    const id = Math.floor(Math.random() * db.testimonials.length)
    res.json(dbdb.testimonials[id])
})

router.route('/testimonials/:id').get((req, res) => {
    const id = parseInt(req.params.id) - 1;
    res.json(db.testimonials[id]);
})

router.route('/testimonials').post((req, res) => {
    db.testimonials.push({
        id: db.testimonials.length + 1,
        author: req.body.author,
        text: req.body.text,
    })
    res.send({ message: 'OK' });
})

router.route('/testimonials/:id').put((req, res) => {
    const id = parseInt(req.params.id);

    db.testimonials.forEach((item, i) => {
        if (item.id === id)
            db.testimonials[i] = {
                id: id,
                author: req.body.author,
                text: req.body.text,
            };


        res.send({ message: 'OK' });
    })
})

router.route('/testimonials/:id').delete((req, res) => {
    const id = parseInt(req.params.id);

    db.testimonials.splice(db.testimonials.findIndex(item => item.id === id), 1);

    res.send({ message: 'OK' });
})


module.exports = router;