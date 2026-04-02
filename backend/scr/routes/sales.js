const express = require('express')
const router = express.Router()
const saleController = require('../modules/sales/sales.controller')

router.post('/', saleController.create)
router.get('/', saleController.getAll)
router.get('/:id', saleController.getById)
router.get('/order/:orderId', saleController.getByOrderId)
router.get('/customer/:customerId', saleController.getByCustomerId)
router.put('/:id', saleController.update)
router.delete('/:id', saleController.delete)

module.exports = router