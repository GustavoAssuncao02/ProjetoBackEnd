const subcategoriesRepository = require('./subcategories.repository');

async function getAll() {
    return subcategoriesRepository.findAll();
}

async function getAllActive() {
    return subcategoriesRepository.findAllActive();
}

async function getByCategory(categoryId) {
    if (!categoryId) {
        throw new Error('category_id é obrigatório');
    }

    return subcategoriesRepository.findByCategoryId(categoryId);
}

async function getById(id) {
    const subcategory = await subcategoriesRepository.findById(id);

    if (!subcategory) {
        throw new Error('Subcategoria não encontrada');
    }

    return subcategory;
}

async function create(data) {
    if (!data.name || !data.category_id) {
        throw new Error('name e category_id são obrigatórios');
    }

    return subcategoriesRepository.create(data);
}

async function update(id, data) {
    if (!data.name || !data.category_id) {
        throw new Error('name e category_id são obrigatórios');
    }

    return subcategoriesRepository.update(id, data);
}

async function deactivate(id) {
    return subcategoriesRepository.deactivate(id);
}

async function activate(id) {
    return subcategoriesRepository.activate(id);
}
async function remove(id) {
    try {
        return await subcategoriesRepository.remove(id)
    } catch (error) {
        if (error.code === 'P2003') {
            throw new Error('Não é possível excluir esta subcategoria porque ela está vinculada a produtos.')
        }

        throw error
    }
}

module.exports = {
    getAll,
    getAllActive,
    getByCategory,
    getById,
    create,
    update,
    deactivate,
    activate,
    remove
};