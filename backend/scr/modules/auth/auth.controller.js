const authService = require('./auth.service')

class AuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body
      const result = await authService.login(email, password)

      res.status(200).json(result)
    } catch (err) {
      res.status(401).json({ error: err.message })
    }
  }

  async me(req, res) {
    try {
      const user = await authService.me(req.user.id)
      res.status(200).json(user)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }
}

module.exports = new AuthController()