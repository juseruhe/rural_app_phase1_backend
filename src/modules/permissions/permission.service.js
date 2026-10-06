const repository = require("./permission.repository");
const { randomUUID } = require("crypto");


class AppError extends Error {

    constructor(message, statusCode, code = "APP_ERROR") {

        super(message);

        this.statusCode = statusCode;
        this.code = code;
        this.isOperational = true;
    }
}

async function getPermissions(page, limit) {

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

async function getPermissionByUUId(uuid) {

    const permission = await repository.findByUuid(uuid);

    if (!permission) {

        throw new AppError(
            "El permiso no existe",
            404,
            "PERMISSION_NOT_FOUND"
        );
    }

    return permission;
}

async function createPermission(data) {

    const existingPermission =
        await repository.findByName(data.name);

    if (existingPermission) {

        throw new AppError(
            "Ya existe un permiso con ese nombre",
            409,
            "PERMISSION_ALREADY_EXISTS"
        );
    }

    data.uuid = randomUUID();

    return repository.create(data);
}

async function updatePermission(uuid, data) {

    await getPermissionByUUId(uuid);

    const existingPermission =
        await repository.findByName(data.name);

    if (
        existingPermission &&
        existingPermission.uuid !== uuid
    ) {

        throw new AppError(
            "Ya existe otro permiso con ese nombre",
            409,
            "PERMISSION_ALREADY_EXISTS"
        );
    }

    return repository.update(uuid, data);
}

async function deletePermission(uuid) {

    await getPermissionByUUId(uuid);

    await repository.remove(uuid);

    return {
        message: "Permiso eliminado correctamente"
    };
}

module.exports = {
    getPermissions,
    getPermissionByUUId,
    createPermission,
    updatePermission,
    deletePermission,
    AppError
};