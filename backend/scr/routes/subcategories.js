const express = require('express');
const router = express.Router();

const subcategoriesController = require('../modules/subcategories/subcategories.controller');

// LISTAR
router.get('/', subcategoriesController.getAll);
router.get('/active', subcategoriesController.getAllActive);
router.get('/by-category', subcategoriesController.getByCategory);
router.get('/:id', subcategoriesController.getById);

// CRUD
router.post('/', subcategoriesController.create);
router.put('/:id', subcategoriesController.update);

// ATIVAR / DESATIVAR
router.patch('/:id/activate', subcategoriesController.activate);

router.patch('/:id/deactivate', subcategoriesController.deactivate)
router.delete('/:id', subcategoriesController.remove)

module.exports = router;