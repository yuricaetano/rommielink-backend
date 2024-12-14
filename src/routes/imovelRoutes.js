const express = require('express');
const imovelController = require('../controllers/imovelController');

const router = express.Router();

// Define routes for 'imovel'
router.get('/', imovelController.getAllImoveis);
router.get('/:id', imovelController.getImovelById);
router.post('/', imovelController.createImovel);
router.put('/:id', imovelController.updateImovel);
router.delete('/:id', imovelController.deleteImovel);

module.exports = router;