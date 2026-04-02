const saleRepository = require('./sales.repository')

class SaleService {
  async createSale(data) {
    if (!data.order_id) {
      throw new Error('Order id is required')
    }

    if (!data.product_id) {
      throw new Error('Product id is required')
    }

    if (!data.product_name) {
      throw new Error('Product name is required')
    }

    if (!data.quantity) {
      throw new Error('Quantity is required')
    }

    if (data.unit_price === undefined || data.unit_price === null) {
      throw new Error('Unit price is required')
    }

    if (!data.customer_id) {
      throw new Error('Customer id is required')
    }

    data.order_id = Number(data.order_id)
    data.product_id = Number(data.product_id)
    data.customer_id = Number(data.customer_id)
    data.quantity = Number(data.quantity)
    data.unit_price = Number(data.unit_price)

    if (data.variant_id !== undefined && data.variant_id !== null && data.variant_id !== '') {
      data.variant_id = Number(data.variant_id)
    } else {
      delete data.variant_id
    }

    if (data.total_price === undefined || data.total_price === null) {
      data.total_price = Number((data.quantity * data.unit_price).toFixed(2))
    } else {
      data.total_price = Number(data.total_price)
    }

    if (data.sold_at) {
      data.sold_at = new Date(data.sold_at)
    }

    return saleRepository.create(data)
  }

  getAllSales() {
    return saleRepository.findAll()
  }

  async getSaleById(id) {
    const sale = await saleRepository.findById(id)

    if (!sale) {
      throw new Error('Sale not found')
    }

    return sale
  }

  getSalesByOrderId(order_id) {
    return saleRepository.findByOrderId(Number(order_id))
  }

  getSalesByCustomerId(customer_id) {
    return saleRepository.findByCustomerId(Number(customer_id))
  }

  async updateSale(id, data) {
    const sale = await saleRepository.findById(id)

    if (!sale) {
      throw new Error('Sale not found')
    }

    if (data.order_id !== undefined) {
      data.order_id = Number(data.order_id)
    }

    if (data.product_id !== undefined) {
      data.product_id = Number(data.product_id)
    }

    if (data.customer_id !== undefined) {
      data.customer_id = Number(data.customer_id)
    }

    if (data.quantity !== undefined) {
      data.quantity = Number(data.quantity)
    }

    if (data.unit_price !== undefined) {
      data.unit_price = Number(data.unit_price)
    }

    if (data.variant_id !== undefined && data.variant_id !== null && data.variant_id !== '') {
      data.variant_id = Number(data.variant_id)
    }

    if (data.sold_at) {
      data.sold_at = new Date(data.sold_at)
    }

    if (
      data.total_price === undefined &&
      (data.quantity !== undefined || data.unit_price !== undefined)
    ) {
      const quantity = data.quantity !== undefined ? data.quantity : sale.quantity
      const unitPrice = data.unit_price !== undefined ? data.unit_price : Number(sale.unit_price)
      data.total_price = Number((quantity * unitPrice).toFixed(2))
    }

    if (data.total_price !== undefined) {
      data.total_price = Number(data.total_price)
    }

    return saleRepository.updateById(id, data)
  }

  async deleteSale(id) {
    const sale = await saleRepository.findById(id)

    if (!sale) {
      throw new Error('Sale not found')
    }

    return saleRepository.deleteById(id)
  }
}

module.exports = new SaleService()