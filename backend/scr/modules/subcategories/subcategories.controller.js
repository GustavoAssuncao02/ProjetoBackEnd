const subcategoriesService = require('./subcategories.service');

async function getAll(req, res) {
    try {
        const subcategories = await subcategoriesService.getAll();

        return res.json({ ok: true, subcategories });
    } catch (error) {
        return res.status(500).json({ ok: false, message: error.message });
    }
}

async function getAllActive(req, res) {
    try {
        const subcategories = await subcategoriesService.getAllActive();

        return res.json({ ok: true, subcategories });
    } catch (error) {
        return res.status(500).json({ ok: false, message: error.message });
    }
}

async function getByCategory(req, res) {
    try {
        const { category_id } = req.query;

        const subcategories = await subcategoriesService.getByCategory(category_id);

        return res.json({ ok: true, subcategories });
    } catch (error) {
        return res.status(400).json({ ok: false, message: error.message });
    }
}

async function getById(req, res) {
    try {
        const { id } = req.params;

        const subcategory = await subcategoriesService.getById(id);

        return res.json({ ok: true, subcategory });
    } catch (error) {
        return res.status(404).json({ ok: false, message: error.message });
    }
}

async function create(req, res) {
    try {
        const subcategory = await subcategoriesService.create(req.body);

        return res.status(201).json({ ok: true, subcategory });
    } catch (error) {
        return res.status(400).json({ ok: false, message: error.message });
    }
}

async function update(req, res) {
    try {
        const { id } = req.params;

        const subcategory = await subcategoriesService.update(id, req.body);

        return res.json({ ok: true, subcategory });
    } catch (error) {
        return res.status(400).json({ ok: false, message: error.message });
    }
}

async function deactivate(req, res) {
    try {
        const { id } = req.params;

        await subcategoriesService.deactivate(id);

        return res.json({ ok: true, message: 'Subcategoria desativada' });
    } catch (error) {
        return res.status(400).json({ ok: false, message: error.message });
    }
}

async function activate(req, res) {
    try {
        const { id } = req.params;

        await subcategoriesService.activate(id);

        return res.json({ ok: true, message: 'Subcategoria ativada' });
    } catch (error) {
        return res.status(400).json({ ok: false, message: error.message });
    }
}
async function remove(req, res) {
  try {
    const { id } = req.params

    await subcategoriesService.remove(id)

    return res.json({
      ok: true,
      message: 'Subcategory deleted successfully'
    })
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: error.message
    })
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