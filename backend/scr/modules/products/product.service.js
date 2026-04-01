const productRepository = require('./product.repository')

class ProductService {
  async createProduct(data) {
    if (!data.name) {
      throw new Error('Name is required')
    }

    if (data.price === undefined || data.price === null) {
      throw new Error('Price is required')
    }

    if (data.stock_quantity === undefined || data.stock_quantity === null) {
      throw new Error('Stock quantity is required')
    }

    if (data.category_id === undefined || data.category_id === null) {
      throw new Error('Category id is required')
    }

    data.price = Number(data.price)
    data.stock_quantity = Number(data.stock_quantity)
    data.category_id = Number(data.category_id)

    return productRepository.create(data)
  }

  getAllProducts() {
    return productRepository.findAll()
  }

  async getProductById(id) {
    const product = await productRepository.findById(id)

    if (!product) {
      throw new Error('Product not found')
    }

    return product
  }

  async updateProduct(id, data) {
    const product = await productRepository.findById(id)

    if (!product) {
      throw new Error('Product not found')
    }

    if (data.price !== undefined) {
      data.price = Number(data.price)
    }

    if (data.stock_quantity !== undefined) {
      data.stock_quantity = Number(data.stock_quantity)
    }

    if (data.category_id !== undefined) {
      data.category_id = Number(data.category_id)
    }

    return productRepository.updateById(id, data)
  }

  async deleteProduct(id) {
    const product = await productRepository.findById(id)

    if (!product) {
      throw new Error('Product not found')
    }

    return productRepository.deleteById(id)
  }
}

module.exports = new ProductService()