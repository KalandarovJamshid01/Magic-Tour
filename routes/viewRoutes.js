const router = require('express').Router();
const viewController = require('./../controllers/viewController');

router.route('/').get(viewController.getAllTour);
router.route('/overview').get(viewController.getAllTour);
router.route('/tour/:id').get(viewController.getOneTour);
router.route('/login').get(viewController.login);
module.exports = router;
