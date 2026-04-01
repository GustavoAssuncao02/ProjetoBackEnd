const categoryService = require('./category.service')

class CategoryController {
  async create(req, res) {
    try {
      const category = await categoryService.createCategory(req.body)
      res.status(201).json(category)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async getAll(req, res) {
    try {
      const categories = await categoryService.getAllCategories()
      res.status(200).json(categories)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params
      const category = await categoryService.getCategoryById(Number(id))
      res.status(200).json(category)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params
      const category = await categoryService.updateCategory(Number(id), req.body)
      res.status(200).json(category)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params
      await categoryService.deleteCategory(Number(id))
      res.status(200).json({ message: 'Category deleted successfully' })
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }
}

module.exports = new CategoryController()