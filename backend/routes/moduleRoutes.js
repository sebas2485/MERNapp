const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/moduleController');
const authenticate = require('../middleware/authenticate');

router.post('/:courseId', authenticate, moduleController.createModule);
router.put('/:id', authenticate, moduleController.updateModule);
router.delete('/:id', authenticate, moduleController.deleteModule);

module.exports = router;