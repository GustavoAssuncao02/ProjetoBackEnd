const jwt = require('jsonwebtoken')
const jwtConfig = require('../config/jwt')

function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(401).json({ error: 'Token not provided' })
    }

    const parts = authHeader.split(' ')

    if (parts.length !== 2) {
      return res.status(401).json({ error: 'Token error' })
    }

    const [scheme, token] = parts

    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).json({ error: 'Token malformatted' })
    }

    const decoded = jwt.verify(token, jwtConfig.secret)

    req.user = decoded

    return next()
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}

module.exports = authMiddleware