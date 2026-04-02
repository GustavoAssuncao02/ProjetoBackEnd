const express = require('express')
const router = express.Router()
const addressController = require('../modules/address/address.controller')

router.post('/', addressController.create)
router.get('/', addressController.getAll)
router.get('/user/:userId', addressController.getByUserId)
router.get('/:id', addressController.getById)
router.put('/:id', addressController.update)
router.delete('/:id', addressController.delete)

module.exports = router