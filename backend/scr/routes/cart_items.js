const express = require('express')
const router = express.Router()
const cartItemController = require('../modules/cart_items/cartItem.controller')

router.post('/', cartItemController.create)
router.get('/', cartItemController.getAll)
router.get('/:id', cartItemController.getById)
router.get('/cart/:cartId', cartItemController.getByCartId)
router.put('/:id', cartItemController.update)
router.delete('/:id', cartItemController.delete)

module.exports = router