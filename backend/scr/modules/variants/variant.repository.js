const prisma = require('../../database/prisma')

class VariantRepository {
  create(data) {
    return prisma.variants.create({
      data,
      select: {
        id: true,
        product_id: true,
        size: true,
        color: true,
        stock_quantity: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  createImage(data) {
    return prisma.product_images.create({
      data,
      select: {
        id: true,
        variant_id: true,
        image_url: true,
        color: true,
        display_order: true,
        created_at: true
      }
    })
  }

  findById(id) {
    return prisma.variants.findUnique({
      where: { id },
      select: {
        id: true,
        product_id: true,
        size: true,
        color: true,
        stock_quantity: true,
        created_at: true,
        updated_at: true,
        product_images: {
          orderBy: {
            display_order: 'asc'
          },
          select: {
            id: true,
            variant_id: true,
            image_url: true,
            color: true,
            display_order: true,
            created_at: true
          }
        }
      }
    })
  }

  findAll() {
    return prisma.variants.findMany({
      select: {
        id: true,
        product_id: true,
        size: true,
        color: true,
        stock_quantity: true,
        created_at: true,
        updated_at: true,
        product_images: {
          orderBy: {
            display_order: 'asc'
          },
          select: {
            id: true,
            variant_id: true,
            image_url: true,
            color: true,
            display_order: true,
            created_at: true
          }
        }
      }
    })
  }

  findByProductId(product_id) {
    return prisma.variants.findMany({
      where: { product_id },
      select: {
        id: true,
        product_id: true,
        size: true,
        color: true,
        stock_quantity: true,
        created_at: true,
        updated_at: true,
        product_images: {
          orderBy: {
            display_order: 'asc'
          },
          select: {
            id: true,
            variant_id: true,
            image_url: true,
            color: true,
            display_order: true,
            created_at: true
          }
        }
      }
    })
  }

  updateById(id, data) {
    return prisma.variants.update({
      where: { id },
      data,
      select: {
        id: true,
        product_id: true,
        size: true,
        color: true,
        stock_quantity: true,
        created_at: true,
        updated_at: true,
        product_images: {
          orderBy: {
            display_order: 'asc'
          },
          select: {
            id: true,
            variant_id: true,
            image_url: true,
            color: true,
            display_order: true,
            created_at: true
          }
        }
      }
    })
  }

  deleteById(id) {
    return prisma.variants.delete({
      where: { id }
    })
  }

  async getTotalStockByProductId(product_id) {
    const result = await prisma.variants.aggregate({
      where: { product_id },
      _sum: {
        stock_quantity: true
      }
    })

    return result._sum.stock_quantity || 0
  }

  updateProductStock(product_id, stock_quantity) {
    return prisma.products.update({
      where: { id: product_id },
      data: { stock_quantity }
    })
  }
}

module.exports = new VariantRepository()