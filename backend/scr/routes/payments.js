const express = require('express')
const router = express.Router()
const paymentController = require('../modules/payments/payment.controller')
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/', paymentController.create)

router.get('/me', authMiddleware, paymentController.getMine)
router.get('/me/:id', authMiddleware, paymentController.getMyById)

router.get('/', paymentController.getAll)
router.get('/order/:orderId', paymentController.getByOrderId)
router.get('/:id', paymentController.getById)
router.put('/:id', paymentController.update)
router.delete('/:id', paymentController.delete)

module.exports = router