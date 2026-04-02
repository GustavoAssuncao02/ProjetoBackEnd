const variantRepository = require('./variant.repository')

class VariantService {
  async createVariant(data) {
    if (!data.product_id) {
      throw new Error('Product id is required')
    }

    if (!data.size) {
      throw new Error('Size is required')
    }

    if (!data.color) {
      throw new Error('Color is required')
    }

    if (data.stock_quantity === undefined || data.stock_quantity === null) {
      throw new Error('Stock quantity is required')
    }

    data.product_id = Number(data.product_id)
    data.stock_quantity = Number(data.stock_quantity)

    return variantRepository.create(data)
  }

  getAllVariants() {
    return variantRepository.findAll()
  }

  async getVariantById(id) {
    const variant = await variantRepository.findById(id)

    if (!variant) {
      throw new Error('Variant not found')
    }

    return variant
  }

  getVariantsByProductId(product_id) {
    return variantRepository.findByProductId(Number(product_id))
  }

  async updateVariant(id, data) {
    const variant = await variantRepository.findById(id)

    if (!variant) {
      throw new Error('Variant not found')
    }

    if (data.product_id !== undefined) {
      data.product_id = Number(data.product_id)
    }

    if (data.stock_quantity !== undefined) {
      data.stock_quantity = Number(data.stock_quantity)
    }

    return variantRepository.updateById(id, data)
  }

  async deleteVariant(id) {
    const variant = await variantRepository.findById(id)

    if (!variant) {
      throw new Error('Variant not found')
    }

    return variantRepository.deleteById(id)
  }
}

module.exports = new VariantService()