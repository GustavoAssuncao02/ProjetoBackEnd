const express = require('express')
const router = express.Router()
const variantController = require('../modules/variants/variant.controller')

router.post('/', variantController.create)
router.get('/', variantController.getAll)
router.get('/product/:productId', variantController.getByProductId)
router.get('/:id', variantController.getById)
router.put('/:id', variantController.update)
router.delete('/:id', variantController.delete)

module.exports = router