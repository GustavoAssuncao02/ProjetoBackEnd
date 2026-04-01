const express = require('express')
const router = express.Router()
const userController = require('../modules/users/user.controller')

router.post('/register', userController.register)
router.get('/', userController.getAll)
router.delete('/:id', userController.delete)
router.put('/:id', userController.update)

module.exports = router