const prisma = require('../../database/prisma')

class AddressRepository {
  create(data) {
    return prisma.addresses.create({
      data,
      select: {
        id: true,
        user_id: true,
        street: true,
        number: true,
        complement: true,
        neighborhood: true,
        city: true,
        state: true,
        zip_code: true,
        country: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  findById(id) {
    return prisma.addresses.findUnique({
      where: { id },
      select: {
        id: true,
        user_id: true,
        street: true,
        number: true,
        complement: true,
        neighborhood: true,
        city: true,
        state: true,
        zip_code: true,
        country: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  findAll() {
    return prisma.addresses.findMany({
      select: {
        id: true,
        user_id: true,
        street: true,
        number: true,
        complement: true,
        neighborhood: true,
        city: true,
        state: true,
        zip_code: true,
        country: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  findByUserId(user_id) {
    return prisma.addresses.findMany({
      where: { user_id },
      select: {
        id: true,
        user_id: true,
        street: true,
        number: true,
        complement: true,
        neighborhood: true,
        city: true,
        state: true,
        zip_code: true,
        country: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  updateById(id, data) {
    return prisma.addresses.update({
      where: { id },
      data,
      select: {
        id: true,
        user_id: true,
        street: true,
        number: true,
        complement: true,
        neighborhood: true,
        city: true,
        state: true,
        zip_code: true,
        country: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  deleteById(id) {
    return prisma.addresses.delete({
      where: { id }
    })
  }
}

module.exports = new AddressRepository()