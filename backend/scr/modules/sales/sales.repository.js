const prisma = require('../../database/prisma')

class SaleRepository {
  create(data) {
    return prisma.sales.create({
      data,
      select: {
        id: true,
        order_id: true,
        product_id: true,
        variant_id: true,
        product_name: true,
        product_category: true,
        size: true,
        color: true,
        quantity: true,
        unit_price: true,
        total_price: true,
        customer_id: true,
        sold_at: true
      }
    })
  }

  findById(id) {
    return prisma.sales.findUnique({
      where: { id },
      select: {
        id: true,
        order_id: true,
        product_id: true,
        variant_id: true,
        product_name: true,
        product_category: true,
        size: true,
        color: true,
        quantity: true,
        unit_price: true,
        total_price: true,
        customer_id: true,
        sold_at: true
      }
    })
  }

  findAll() {
    return prisma.sales.findMany({
      select: {
        id: true,
        order_id: true,
        product_id: true,
        variant_id: true,
        product_name: true,
        product_category: true,
        size: true,
        color: true,
        quantity: true,
        unit_price: true,
        total_price: true,
        customer_id: true,
        sold_at: true
      },
      orderBy: {
        sold_at: 'desc'
      }
    })
  }

  findByOrderId(order_id) {
    return prisma.sales.findMany({
      where: { order_id },
      select: {
        id: true,
        order_id: true,
        product_id: true,
        variant_id: true,
        product_name: true,
        product_category: true,
        size: true,
        color: true,
        quantity: true,
        unit_price: true,
        total_price: true,
        customer_id: true,
        sold_at: true
      }
    })
  }

  findByCustomerId(customer_id) {
    return prisma.sales.findMany({
      where: { customer_id },
      select: {
        id: true,
        order_id: true,
        product_id: true,
        variant_id: true,
        product_name: true,
        product_category: true,
        size: true,
        color: true,
        quantity: true,
        unit_price: true,
        total_price: true,
        customer_id: true,
        sold_at: true
      },
      orderBy: {
        sold_at: 'desc'
      }
    })
  }

  updateById(id, data) {
    return prisma.sales.update({
      where: { id },
      data,
      select: {
        id: true,
        order_id: true,
        product_id: true,
        variant_id: true,
        product_name: true,
        product_category: true,
        size: true,
        color: true,
        quantity: true,
        unit_price: true,
        total_price: true,
        customer_id: true,
        sold_at: true
      }
    })
  }

  deleteById(id) {
    return prisma.sales.delete({
      where: { id }
    })
  }
}

module.exports = new SaleRepository()