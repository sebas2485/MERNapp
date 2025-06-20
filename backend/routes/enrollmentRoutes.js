const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController');
const authenticate = require('../middleware/authenticate');

router.post('/:courseId', authenticate, enrollmentController.enrollInCourse);
router.get('/my', authenticate, enrollmentController.getUserEnrollments);
router.delete('/:id', authenticate, enrollmentController.cancelEnrollment);

module.exports = router;