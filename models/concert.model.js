const mongoose = require('mongoose');

const concertSchema = new mongoose.Schema({
    performer: { type: String, requrie: true },
    genre: { type: String, requrie: true },
    price: { type: Number, requried: true },
    day: { type: Number, requried: true },
    image: { type: String, requrie: true }

});

module.exports = mongoose.model('Concert', concertSchema)