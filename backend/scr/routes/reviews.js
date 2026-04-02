const express = require('express')
const router = express.Router()
const reviewController = require('../modules/reviews/review.controller')

router.post('/', reviewController.create)
router.get('/', reviewController.getAll)
router.get('/:id', reviewController.getById)
router.get('/product/:productId', reviewController.getByProductId)
router.put('/:id', reviewController.update)
router.delete('/:id', reviewController.delete)
router.get('/product/:productId/stats', reviewController.getRatingStats)

module.exports = router