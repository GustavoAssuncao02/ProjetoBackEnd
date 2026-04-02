const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const prisma = require('../../database/prisma')
const jwtConfig = require('../../config/jwt')

class AuthService {
  async login(email, password) {
    if (!email || !password) {
      throw new Error('Email and password are required')
    }

    const user = await prisma.users.findUnique({
      where: { email }
    })

    if (!user) {
      throw new Error('Invalid email or password')
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      throw new Error('Invalid email or password')
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    )

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    }
  }

  async me(userId) {
    const user = await prisma.users.findUnique({
      where: { id: Number(userId) },
      select: {
        id: true,
        name: true,
        birth_date: true,
        email: true,
        cpf: true,
        phone: true,
        gender: true,
        role: true,
        created_at: true,
        updated_at: true
      }
    })

    if (!user) {
      throw new Error('User not found')
    }

    return user
  }
}

module.exports = new AuthService()