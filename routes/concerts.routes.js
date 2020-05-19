// concerts.routes.js

const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concerts.controller');

// endpoint for concerts
router.get('/concerts', ConcertController.getAll);
router.get('/concerts/:id', ConcertController.getById);

router.get('/concerts/performer/:performer', ConcertController.getByPerformer);
router.get('/concerts/genre/:genre', ConcertController.getByGenre);
router.get('/concerts/price/:price_min/:price_max', ConcertController.getByPrice);
router.get('/concerts/day/:day', ConcertController.getByDay);

router.post('/concerts', ConcertController.add);
router.put('/concerts/:id', ConcertController.updateOne);
router.delete('/concerts/:id', ConcertController.delete);

module.exports = router;