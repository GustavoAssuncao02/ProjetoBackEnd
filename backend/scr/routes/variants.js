const express = require('express')
const router = express.Router()
const variantController = require('../modules/variants/variant.controller')

router.post('/', variantController.create)
router.get('/', variantController.getAll)
router.get('/:id', variantController.getById)
router.get('/product/:productId', variantController.getByProductId)
router.put('/:id', variantController.update)
router.delete('/:id', variantController.delete)

module.exports = router