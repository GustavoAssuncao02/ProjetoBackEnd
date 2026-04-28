const express = require('express')
const router = express.Router()
const variantController = require('../modules/variants/variant.controller')
const uploadImage = require('../middlewares/uploadImage.middleware')

router.post('/', uploadImage.array('images', 10), variantController.create)
router.get('/', variantController.getAll)
router.get('/product/:productId', variantController.getByProductId)
router.get('/:id', variantController.getById)
router.put('/:id', variantController.update)
router.delete('/:id', variantController.delete)

module.exports = router