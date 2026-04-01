const prisma = require('../../database/prisma')

class UserRepository {
  create(data) {
    return prisma.users.create({ data })
  }

  findById(id) {
    return prisma.users.findUnique({ where: { id } })
  }

  findByEmail(email) {
    return prisma.users.findUnique({ where: { email } })
  }

  findAll() {
    return prisma.users.findMany()
  }

  deleteById(id) {
  return prisma.users.delete({
    where: { id }
  })
}
  updateById(id, data) {
  return prisma.users.update({
    where: { id },
    data
  })
}

}

module.exports = new UserRepository()