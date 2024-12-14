const express = require('express');
const anuncianteController = require('../controllers/anuncianteController');

const router = express.Router();

// Define routes for 'anunciante'
router.get('/', anuncianteController.getAllAnunciantes);
router.get('/:id', anuncianteController.getAnuncianteById);
router.post('/', anuncianteController.createAnunciante);
router.put('/:id', anuncianteController.updateAnunciante);
router.delete('/:id', anuncianteController.deleteAnunciante);

module.exports = router;