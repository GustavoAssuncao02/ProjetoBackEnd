const addressRepository = require('./address.repository')

class AddressService {
  async createAddress(data) {
    if (!data.user_id) throw new Error('User id is required')
    if (!data.street) throw new Error('Street is required')
    if (!data.number) throw new Error('Number is required')
    if (!data.neighborhood) throw new Error('Neighborhood is required')
    if (!data.city) throw new Error('City is required')
    if (!data.state) throw new Error('State is required')
    if (!data.zip_code) throw new Error('Zip code is required')

    data.user_id = Number(data.user_id)

    if (!data.country) {
      data.country = 'Brazil'
    }

    return addressRepository.create(data)
  }

  getAllAddresses() {
    return addressRepository.findAll()
  }

  async getAddressById(id) {
    const address = await addressRepository.findById(Number(id))

    if (!address) {
      throw new Error('Address not found')
    }

    return address
  }

  getAddressesByUserId(user_id) {
    return addressRepository.findByUserId(Number(user_id))
  }

  async updateAddress(id, data) {
    const address = await addressRepository.findById(Number(id))

    if (!address) {
      throw new Error('Address not found')
    }

    if (data.user_id !== undefined) {
      data.user_id = Number(data.user_id)
    }

    return addressRepository.updateById(Number(id), data)
  }

  async deleteAddress(id) {
    const address = await addressRepository.findById(Number(id))

    if (!address) {
      throw new Error('Address not found')
    }

    return addressRepository.deleteById(Number(id))
  }
}

module.exports = new AddressService()