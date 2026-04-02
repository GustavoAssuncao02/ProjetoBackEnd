const express = require('express')
const router = express.Router()
const cartController = require('../modules/carts/cart.controller')
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/', authMiddleware, cartController.create)

router.get('/me', authMiddleware, cartController.getMine)
router.get('/me/:id', authMiddleware, cartController.getMyById)
router.put('/me/:id', authMiddleware, cartController.updateMine)
router.delete('/me/:id', authMiddleware, cartController.deleteMine)

router.get('/', cartController.getAll)
router.get('/:id', cartController.getById)
router.put('/:id', cartController.update)
router.delete('/:id', cartController.delete)

router.post('/items', cartController.addItem)
router.get('/:cartId/items', cartController.getItemsByCartId)
router.put('/items/:id', cartController.updateItem)
router.delete('/items/:id', cartController.deleteItem)

module.exports = router