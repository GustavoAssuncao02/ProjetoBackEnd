const express = require('express')
const router = express.Router()
const orderController = require('../modules/orders/orders.controller')

router.post('/', orderController.create)
router.get('/', orderController.getAll)
router.get('/:id', orderController.getById)
router.put('/:id', orderController.update)
router.delete('/:id', orderController.delete)

module.exports = router