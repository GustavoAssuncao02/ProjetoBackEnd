const prisma = require('../../database/prisma')

const productSelect = {
  id: true,
  name: true,
  description: true,
  material_id: true,
  old_price: true,
  current_price: true,
  stock_quantity: true,
  category_id: true,
  subcategory_id: true,
  created_at: true,
  updated_at: true,
  materials: {
    select: {
      id: true,
      name: true,
      activated: true
    }
  }
}

class ProductRepository {
  create(data) {
    return prisma.products.create({
      data,
      select: productSelect
    })
  }

  findById(id) {
    return prisma.products.findUnique({
      where: { id },
      select: productSelect
    })
  }

  findAll() {
    return prisma.products.findMany({
      include: {
        categories: true,
        materials: true,
        subcategories: true
      }
    })
  }

  updateById(id, data) {
    return prisma.products.update({
      where: { id },
      data,
      select: productSelect
    })
  }

  deleteById(id) {
    return prisma.products.delete({
      where: { id }
    })
  }
}

module.exports = new ProductRepository()
