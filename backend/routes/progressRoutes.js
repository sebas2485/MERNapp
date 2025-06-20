const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');
const authenticate = require('../middleware/authenticate');

router.post('/:moduleId', authenticate, progressController.markProgress);
router.get('/my', authenticate, progressController.getUserProgress);

module.exports = router;
