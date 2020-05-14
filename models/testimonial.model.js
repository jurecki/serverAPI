const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    author: { type: String, requrie: true },
    text: { type: String, requrie: true },
});

module.exports = mongoose.model('Testimonial', testimonialSchema)