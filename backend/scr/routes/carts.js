const express = require('express')
const router = express.Router()
const cartController = require('../modules/carts/cart.controller')

router.post('/', cartController.create)
router.get('/', cartController.getAll)
router.get('/:id', cartController.getById)
router.put('/:id', cartController.update)
router.delete('/:id', cartController.delete)

router.post('/items', cartController.addItem)
router.get('/:cartId/items', cartController.getItemsByCartId)
router.put('/items/:id', cartController.updateItem)
router.delete('/items/:id', cartController.deleteItem)

module.exports = router