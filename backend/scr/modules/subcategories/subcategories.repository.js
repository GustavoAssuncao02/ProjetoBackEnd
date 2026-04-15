const prisma = require('../../database/prisma');

async function findAll() {
    return prisma.subcategories.findMany({
        orderBy: { id: 'asc' },
    });
}

async function findAllActive() {
    return prisma.subcategories.findMany({
        where: { activated: true },
        orderBy: { id: 'asc' },
    });
}

async function findByCategoryId(categoryId) {
    return prisma.subcategories.findMany({
        where: {
            category_id: Number(categoryId),
            activated: true,
        },
        orderBy: { id: 'asc' },
    });
}

async function findById(id) {
    return prisma.subcategories.findUnique({
        where: { id: Number(id) },
    });
}

async function create(data) {
    return prisma.subcategories.create({
        data: {
            name: data.name,
            category_id: data.category_id,
            activated: true,
        },
    });
}

async function update(id, data) {
    return prisma.subcategories.update({
        where: { id: Number(id) },
        data: {
            name: data.name,
            category_id: data.category_id,
        },
    });
}

async function deactivate(id) {
    return prisma.subcategories.update({
        where: { id: Number(id) },
        data: { activated: false },
    });
}

async function activate(id) {
    return prisma.subcategories.update({
        where: { id: Number(id) },
        data: { activated: true },
    });
}
async function remove(id) {
    return prisma.subcategories.delete({
        where: { id: Number(id) }
    })
}

module.exports = {
    findAll,
    findAllActive,
    findByCategoryId,
    findById,
    create,
    update,
    deactivate,
    activate,
    remove
};