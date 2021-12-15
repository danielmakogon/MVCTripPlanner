const express = require('express');
const controller = require('../controllers/tripController');
const router = express.Router();

router.get('/', controller.index);
router.get('/explore', controller.getExplore);
router.post('/create', controller.create);
router.get('/profile', controller.profile);
router.get('/trip/:id', controller.getTrip);

module.exports = router;