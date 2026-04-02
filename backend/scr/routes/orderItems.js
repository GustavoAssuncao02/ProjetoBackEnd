const express = require('express')
const router = express.Router()
const orderItemController = require('../modules/order_items/orderitem.controller')

router.post('/', orderItemController.create)
router.get('/', orderItemController.getAll)
router.get('/:id', orderItemController.getById)
router.get('/order/:orderId', orderItemController.getByOrderId)
router.put('/:id', orderItemController.update)
router.delete('/:id', orderItemController.delete)

module.exports = router