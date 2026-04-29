const prisma = require('../../database/prisma')

class MaterialRepository {
  create(data) {
    return prisma.materials
      .create({
        data,
        select: {
          id: true,
          name: true,
          activated: true,
          created_at: true,
          updated_at: true
        }
      })
      .catch((error) => {
        if (error.code === 'P2002') {
          throw new Error('A material with this name already exists.')
        }

        throw error
      })
  }

  findAll() {
    return prisma.materials.findMany({
      orderBy: {
        name: 'asc'
      },
      select: {
        id: true,
        name: true,
        activated: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  findById(id) {
    return prisma.materials.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        activated: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  updateById(id, data) {
    return prisma.materials
      .update({
        where: { id },
        data,
        select: {
          id: true,
          name: true,
          activated: true,
          created_at: true,
          updated_at: true
        }
      })
      .catch((error) => {
        if (error.code === 'P2002') {
          throw new Error('A material with this name already exists.')
        }

        throw error
      })
  }

  async deleteById(id) {
    try {
      return await prisma.materials.delete({
        where: { id }
      })
    } catch (error) {
      if (error.code === 'P2003') {
        throw new Error('This material cannot be deleted because it is linked to products.')
      }

      throw error
    }
  }
}

module.exports = new MaterialRepository()
