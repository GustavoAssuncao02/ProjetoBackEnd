const userService = require('./user.service')

class UserController {
  async register(req, res) {
    try {
      const user = await userService.register(req.body)
      res.status(201).json(user)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async getAll(req, res) {
    try {
      const users = await userService.getAllUsers()
      res.status(200).json(users)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params

      await userService.deleteUser(Number(id))

      res.status(200).json({ message: 'User deleted successfully' })
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }
  async update(req, res) {
  try {
    const { id } = req.params
    const updatedUser = await userService.updateUser(Number(id), req.body)

    res.status(200).json(updatedUser)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}



}

module.exports = new UserController()