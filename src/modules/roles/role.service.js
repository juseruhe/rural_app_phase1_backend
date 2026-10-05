const repository = require("./role.repository");
const { randomUUID } = require("crypto");


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

async function getRoleByUUId(uuid) {

    const role = await repository.findByUuid(uuid);

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

    data.uuid = randomUUID();

    return repository.create(data);
}

async function updateRole(uuid, data) {

    await getRoleByUUId(uuid);

    const existingRole =
        await repository.findByName(data.name);

    if (
        existingRole &&
        existingRole.uuid !== uuid
    ) {

        throw new AppError(
            "Ya existe otro rol con ese nombre",
            409,
            "ROLE_ALREADY_EXISTS"
        );
    }

    return repository.update(uuid, data);
}

async function deleteRole(uuid) {

    await getRoleByUUId(uuid);

    await repository.remove(uuid);

    return {
        message: "Rol eliminado correctamente"
    };
}

module.exports = {
    getRoles,
    getRoleByUUId,
    createRole,
    updateRole,
    deleteRole,
    AppError
};