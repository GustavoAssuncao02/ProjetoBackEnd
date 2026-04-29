const userRepository = require('./user.repository')
const bcrypt = require('bcrypt')

class UserService {
  async register(data) {
    if (data.birth_date) {
      data.birth_date = new Date(`${data.birth_date}T00:00:00.000Z`)

      if (Number.isNaN(data.birth_date.getTime())) {
        throw new Error('Invalid birth date')
      }
    }

    data.password = await bcrypt.hash(data.password, 10)

    data.role = 'CUSTOMER' // força aqui

    return userRepository.create(data)
  }

  getAllUsers() {
    return userRepository.findAll()
  }

  getUserByEmail(email) {
    return userRepository.findByEmail(email)
  }
  async deleteUser(id) {
  const user = await userRepository.findById(id)

  if (!user) {
    throw new Error('User not found')
  }

  return userRepository.deleteById(id)
}

async updateUser(id, data) {
  const user = await userRepository.findById(id)

  if (!user) {
    throw new Error('User not found')
  }

  if (data.birth_date) {
    data.birth_date = new Date(`${data.birth_date}T00:00:00.000Z`)

    if (Number.isNaN(data.birth_date.getTime())) {
      throw new Error('Invalid birth date')
    }
  }

  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10)
  }

  return userRepository.updateById(id, data)
}


}

module.exports = new UserService()
