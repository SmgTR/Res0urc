const express = require('express');
const resourcesController = require('./../controllers/resourcesController');
const router = express.Router();
const authController = require('./../controllers/authController');

router.use(authController.protect);

router
  .route('/')
  .get(resourcesController.getAllRes)
  .post(resourcesController.author, resourcesController.createRes);

router.route('/my').get(resourcesController.getUserLinks);
router.route('/search/:keyword').get(resourcesController.searchFor);

router
  .route('/:id')
  .get(resourcesController.getRes)
  .patch(authController.protect, resourcesController.updateRes)
  .delete(authController.protect, resourcesController.deleteRes);

module.exports = router;
