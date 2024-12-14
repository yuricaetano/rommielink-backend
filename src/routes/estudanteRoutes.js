const express = require('express');
const estudanteController = require('../controllers/estudanteController');

const router = express.Router();

// Define routes for estudante
router.get('/', estudanteController.getAllEstudantes);
router.get('/:id', estudanteController.getEstudanteById);
router.post('/', estudanteController.createEstudante);
router.put('/:id', estudanteController.updateEstudante);
router.delete('/:id', estudanteController.deleteEstudante);

module.exports = router;