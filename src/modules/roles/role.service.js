const repository = require("./role.repository");

class AppError extends Error {

    constructor(message, statusCode, code = "APP_ERROR") {

        super(message);

        this.statusCode = statusCode;
        this.code = code;
        this.isOperational = true;
    }
}

async function getRoles(page, limit) {

    const result = await repository.findAll({
        page,
        limit
    });

    const totalPages = Math.ceil(
        result.total / limit
    );

    return {
        data: result.data,

        pagination: {
            page,
            limit,
            total: result.total,
            totalPages
        }
    };
}

async function getRoleById(id) {

    const role = await repository.findById(id);

    if (!role) {

        throw new AppError(
            "El rol no existe",
            404,
            "ROLE_NOT_FOUND"
        );
    }

    return role;
}

async function createRole(data) {

    const existingRole =
        await repository.findByName(data.name);

    if (existingRole) {

        throw new AppError(
            "Ya existe un rol con ese nombre",
            409,
            "ROLE_ALREADY_EXISTS"
        );
    }

    return repository.create(data);
}

async function updateRole(id, data) {

    await getRoleById(id);

    const existingRole =
        await repository.findByName(data.name);

    if (
        existingRole &&
        Number(existingRole.id) !== Number(id)
    ) {

        throw new AppError(
            "Ya existe otro rol con ese nombre",
            409,
            "ROLE_ALREADY_EXISTS"
        );
    }

    return repository.update(id, data);
}

async function deleteRole(id) {

    await getRoleById(id);

    await repository.remove(id);

    return {
        message: "Rol eliminado correctamente"
    };
}

module.exports = {
    getRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole,
    AppError
};