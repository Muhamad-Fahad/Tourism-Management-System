const express = require('express');
const router = express.Router();
const attractionController = require('../controllers/attractionController');

router.post('/', attractionController.createAttraction);
router.get('/', attractionController.getAllAttractions);
router.get('/:id', attractionController.getAttractionById);
router.put('/:id', attractionController.updateAttraction);
router.delete('/:id', attractionController.deleteAttraction);

module.exports = router; 