const materialRepository = require('./material.repository')

class MaterialService {
  async createMaterial(data) {
    if (!data.name) {
      throw new Error('Name is required')
    }

    data.name = data.name.trim()

    if (!data.name) {
      throw new Error('Name is required')
    }

    if (data.activated === undefined) {
      data.activated = true
    }

    return materialRepository.create(data)
  }

  getAllMaterials() {
    return materialRepository.findAll()
  }

  async getMaterialById(id) {
    const material = await materialRepository.findById(id)

    if (!material) {
      throw new Error('Material not found')
    }

    return material
  }

  async updateMaterial(id, data) {
    const material = await materialRepository.findById(id)

    if (!material) {
      throw new Error('Material not found')
    }

    if (!data.name) {
      throw new Error('Name is required')
    }

    data.name = data.name.trim()

    if (!data.name) {
      throw new Error('Name is required')
    }

    return materialRepository.updateById(id, data)
  }

  async toggleMaterial(id) {
    const material = await materialRepository.findById(id)

    if (!material) {
      throw new Error('Material not found')
    }

    return materialRepository.updateById(id, {
      activated: !material.activated
    })
  }

  async deleteMaterial(id) {
    const material = await materialRepository.findById(id)

    if (!material) {
      throw new Error('Material not found')
    }

    return materialRepository.deleteById(id)
  }
}

module.exports = new MaterialService()
