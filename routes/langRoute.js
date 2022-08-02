const router = require('express').Router();
const langController = require('../controllers/langController');
router
  .route('/')
  .get(langController.getAllLanguages)
  .post(langController.addLanguage);

router
  .route('/:id')
  .get(langController.getOneLanguage)
  .patch(langController.updateLanguage)
  .delete(langController.deleteLanguage);

module.exports = router;
