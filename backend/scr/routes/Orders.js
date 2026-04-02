const express = require('express')
const router = express.Router()
const orderController = require('../modules/orders/orders.controller')
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/checkout', authMiddleware, orderController.checkout)
router.post('/', orderController.create)
router.get('/', orderController.getAll)
router.get('/:id', orderController.getById)
router.put('/:id', orderController.update)
router.delete('/:id', orderController.delete)

module.exports = router