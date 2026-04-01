const prisma = require('../../database/prisma')

class CategoryRepository {
  create(data) {
    return prisma.categories.create({
      data,
      select: {
        id: true,
        name: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  findById(id) {
    return prisma.categories.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  findAll() {
    return prisma.categories.findMany({
      select: {
        id: true,
        name: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  updateById(id, data) {
    return prisma.categories.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  deleteById(id) {
    return prisma.categories.delete({
      where: { id }
    })
  }
}

module.exports = new CategoryRepository()