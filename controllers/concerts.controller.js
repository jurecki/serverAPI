const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Concert.find())
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
}

exports.getById = async (req, res) => {
    try {
        const con = await Concert.findById(req.params.id)
        if (!con) res.status(404).json({ message: 'Not found' })
        else res.json(con)
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
}

exports.getByPerformer = async (req, res) => {
    try {

        const { performer } = req.params;

        const concert = await Concert.find({ genre: performer });
        if (!concert) res.status(404).json({ message: 'Not found' });
        else res.json(concert);
    }

    catch (err) {
        res.stastus(500).json({ message: err })
    }
}


exports.getByGenre = async (req, res) => {
    try {

        const { genre } = req.params;

        const concert = await Concert.find({ genre: genre });
        if (!concert) res.status(404).json({ message: 'Not found' });
        else res.json(concert);
    }

    catch (err) {
        res.stastus(500).json({ message: err })
    }
}

exports.getByPrice = async (req, res) => {
    try {

        const { price_min, price_max } = req.params;
        console.log(req.params)
        const concert = await Concert.find({ price: { $gte: price_min, $lte: price_max } });
        if (!concert) res.status(404).json({ message: 'Not found' });
        else res.json(concert);
    }

    catch (err) {
        res.stastus(500).json({ message: err })
    }
}

exports.getByDay = async (req, res) => {
    try {

        const { day } = req.params;

        const concert = await Concert.find({ day: day });
        if (!concert) res.status(404).json({ message: 'Not found' });
        else res.json(concert);
    }

    catch (err) {
        res.stastus(500).json({ message: err })
    }
}

exports.add = async (req, res) => {
    try {
        const { performer, genre, price, day, image } = req.body;
        const newConcert = new Concert({ performer: performer, genre: genre, price: price, day: day, image: image })
        await newConcert.save();
        res.json({ message: 'OK' })
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
}

exports.updateOne = async (req, res) => {
    const { performer, genre, price, day, image } = req.body;

    try {
        await Concert.updateOne({ _id: req.params.id }, { $set: { performer: performer, genre: genre, price: price, day: day, image: image } })
        res.json({ message: 'OK' })
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
}

exports.delete = async (req, res) => {
    try {
        const con = await Concert.findById(req.params.id)
        if (con) {
            await Concert.deleteOne({ _id: req.params.id });
            res.json({ message: 'OK' })
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
}