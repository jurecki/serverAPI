const Seat = require('../models/seat.model');
var sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
    try {
        res.json(await Seat.find())
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
}

exports.getById = async (req, res) => {
    try {
        const seat = await Seat.findById(req.params.id)
        if (!seat) res.status(404).json({ message: 'Not found' })
        else res.json(seat)
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
}

exports.add = async (req, res) => {
    try {
        const day = sanitize(req.body.day);
        const seat = sanitize(req.body.seat);
        const client = sanitize(req.body.client);
        const email = sanitize(req.body.email);
        const newSeat = new Seat({ day: day, seat: seat, client: client, email: email })
        await newSeat.save();

        res.json({ message: 'OK' })
        req.io.emit('seatsUpdated', db.seats)

    }
    catch (err) {
        res.status(500).json({ message: err })
    }
}

exports.updateOne = async (req, res) => {
    const { day, seat, client, email } = req.body;

    try {
        await Seat.updateOne({ _id: req.params.id }, { $set: { day: day, seat: seat, client: client, email: email } })
        res.json({ message: 'OK' })
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
}

exports.delete = async (req, res) => {
    try {
        const seat = await Seat.findById(req.params.id)
        if (seat) {
            await Seat.deleteOne({ _id: req.params.id });
            res.json({ message: 'OK' })
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
}