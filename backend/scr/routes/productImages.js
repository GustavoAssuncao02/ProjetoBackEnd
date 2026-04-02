const express = require('express')
const router = express.Router()
const upload = require('../config/multer')
const productImageController = require('../modules/product-images/productImage.controller')

router.post('/', productImageController.create)
router.post('/upload/:productId', upload.array('images', 10), productImageController.uploadMany)

router.get('/', productImageController.getAll)
router.get('/:id', productImageController.getById)
router.get('/product/:productId', productImageController.getByProductId)
router.get('/product/:productId/color/:color', productImageController.getByProductIdAndColor)

router.put('/:id', productImageController.update)
router.delete('/:id', productImageController.delete)

module.exports = router