const categoryRepository = require('./category.repository')

class CategoryService {
  async createCategory(data) {
    if (!data.name) {
      throw new Error('Name is required')
    }

    if (data.activated === undefined) {
      data.activated = true
    }

    return categoryRepository.create(data)
  }

  getAllCategories() {
    return categoryRepository.findAll()
  }

  async getCategoryById(id) {
    const category = await categoryRepository.findById(id)

    if (!category) {
      throw new Error('Category not found')
    }

    return category
  }

  async updateCategory(id, data) {
    const category = await categoryRepository.findById(id)

    if (!category) {
      throw new Error('Category not found')
    }

    return categoryRepository.updateById(id, data)
  }

  async deleteCategory(id) {
    const category = await categoryRepository.findById(id)

    if (!category) {
      throw new Error('Category not found')
    }

    return categoryRepository.deleteById(id)
  }

  async toggleCategory(id) {
    const category = await categoryRepository.findById(id)

    if (!category) {
      throw new Error('Category not found')
    }

    return categoryRepository.updateById(id, {
      activated: !category.activated
    })
  }
}

module.exports = new CategoryService()