const prisma = require('../../database/prisma')

class CategoryRepository {
  create(data) {
    return prisma.categories.create({
      data,
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
    return prisma.categories.findUnique({
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

  findAll() {
    return prisma.categories.findMany({
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
    return prisma.categories.update({
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
  }

  async deleteById(id) {
    try {
      return await prisma.categories.delete({
        where: { id: Number(id) }
      });
    } catch (error) {
      if (error.code === "P2003") {
        throw new Error(
          "A categoria não pode ser excluída porque possui produtos ou subcategorias vinculados a ela."
        );
      }

      throw new Error("Erro ao excluir categoria.");
    }
  }
}

module.exports = new CategoryRepository()