// testimonials.routes.js

const express = require('express');
const router = express.Router();

const TestimonialController = require('../controllers/testimonials.controller');

// endpoint for concerts
router.get('/testimonials', TestimonialController.getAll);
router.get('/testimonials/random', TestimonialController.getRandom);
router.get('/testimonials/:id', TestimonialController.getById);
router.post('/testimonials', TestimonialController.add);
router.put('/testimonials/:id', TestimonialController.updateOne);
router.delete('/contestimonialscerts/:id', TestimonialController.delete);

module.exports = router;