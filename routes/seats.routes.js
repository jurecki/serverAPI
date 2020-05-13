// seats.routes.js

const express = require('express');
const router = express.Router();
const db = require('../db');

// endpoint for seats
router.route('/seats').get((req, res) => {
    res.json(db.seats);
}
)

router.route('/seats/:id').get((req, res) => {
    const id = parseInt(req.params.id) - 1;
    res.json(db.seats[id]);
})

router.route('/seats').post((req, res) => {
    const checkSeats = db.seats.some(x => x.day === req.body.day && x.seat === req.body.seat)
    if (!checkSeats) {
        db.seats.push({
            id: db.seats.length + 1,
            day: req.body.day,
            seat: req.body.seat,
            client: req.body.client,
            email: req.body.email,
        })

        req.io.emit('seatsUpdated', db.seats)

        res.send({ message: 'OK' });
    } else {
        res.send({ message: "The slot is already taken..." });
    }

})

router.route('/seats/:id').put((req, res) => {
    const id = parseInt(req.params.id);

    db.seats.forEach((item, i) => {
        if (item.id === id)
            db.seats[i] = {
                id: id,
                day: req.body.day,
                seat: req.body.seat,
                client: req.body.client,
                email: req.body.email,
            };

        res.send({ message: 'OK' });
    })
})

router.route('/seats/:id').delete((req, res) => {
    const id = parseInt(req.params.id);

    db.seats.splice(db.seats.findIndex(item => item.id === id), 1);

    res.send({ message: 'OK' });
})

module.exports = router;