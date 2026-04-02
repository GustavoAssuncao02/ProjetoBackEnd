const express = require('express')
const router = express.Router()
const addressController = require('../modules/address/address.controller')
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/', authMiddleware, addressController.create)

router.get('/me', authMiddleware, addressController.getMine)
router.get('/me/:id', authMiddleware, addressController.getMyById)
router.put('/me/:id', authMiddleware, addressController.updateMine)
router.delete('/me/:id', authMiddleware, addressController.deleteMine)

router.get('/', addressController.getAll)
router.get('/user/:userId', addressController.getByUserId)
router.get('/:id', addressController.getById)
router.put('/:id', addressController.update)
router.delete('/:id', addressController.delete)

module.exports = router