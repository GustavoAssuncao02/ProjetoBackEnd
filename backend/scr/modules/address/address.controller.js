const addressService = require('./address.service')

class AddressController {
  async create(req, res) {
  try {
    const address = await addressService.createAddress({
      ...req.body,
      user_id: req.user.id
    })
    res.status(201).json(address)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

  async getAll(req, res) {
    try {
      const addresses = await addressService.getAllAddresses()
      res.status(200).json(addresses)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params
      const address = await addressService.getAddressById(id)
      res.status(200).json(address)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async getByUserId(req, res) {
    try {
      const { userId } = req.params
      const addresses = await addressService.getAddressesByUserId(userId)
      res.status(200).json(addresses)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params
      const address = await addressService.updateAddress(id, req.body)
      res.status(200).json(address)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params
      await addressService.deleteAddress(id)
      res.status(200).json({ message: 'Address deleted successfully' })
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }
  async getMine(req, res) {
  try {
    const addresses = await addressService.getMyAddresses(req.user.id)
    res.status(200).json(addresses)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

async getMyById(req, res) {
  try {
    const { id } = req.params
    const address = await addressService.getMyAddressById(id, req.user.id)
    res.status(200).json(address)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

async updateMine(req, res) {
  try {
    const { id } = req.params
    const address = await addressService.updateMyAddress(id, req.user.id, req.body)
    res.status(200).json(address)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

async deleteMine(req, res) {
  try {
    const { id } = req.params
    await addressService.deleteMyAddress(id, req.user.id)
    res.status(200).json({ message: 'Address deleted successfully' })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}
}

module.exports = new AddressController()