const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
    day: { type: Number, requried: true },
    seat: { type: Number, requried: true },
    client: { type: String, requrie: true },
    email: { type: String, requrie: true },
});

module.exports = mongoose.model('Seat', seatSchema)