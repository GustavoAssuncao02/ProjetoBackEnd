const express = require('express')
const router = express.Router()
const materialController = require('../modules/materials/material.controller')

router.post('/', materialController.create)
router.get('/', materialController.getAll)
router.get('/:id', materialController.getById)
router.put('/:id', materialController.update)
router.patch('/:id/toggle', materialController.toggle)
router.delete('/:id', materialController.delete)

module.exports = router
