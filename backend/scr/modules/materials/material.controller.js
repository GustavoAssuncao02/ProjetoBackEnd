const materialService = require('./material.service')

class MaterialController {
  async create(req, res) {
    try {
      const material = await materialService.createMaterial(req.body)
      res.status(201).json(material)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async getAll(req, res) {
    try {
      const materials = await materialService.getAllMaterials()
      res.status(200).json(materials)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params
      const material = await materialService.getMaterialById(Number(id))
      res.status(200).json(material)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params
      const material = await materialService.updateMaterial(Number(id), req.body)
      res.status(200).json(material)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async toggle(req, res) {
    try {
      const { id } = req.params
      const material = await materialService.toggleMaterial(Number(id))
      res.status(200).json(material)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params
      await materialService.deleteMaterial(Number(id))
      res.status(200).json({ message: 'Material deleted successfully' })
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }
}

module.exports = new MaterialController()
