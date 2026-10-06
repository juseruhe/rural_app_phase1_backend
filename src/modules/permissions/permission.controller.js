const service = require("./permission.service");

async function getPermissions(req, res, next) {

    try {

        const page = Number(req.query.page || 1);
        const limit = Number(req.query.limit || 10);

        const result =
            await service.getPermissions(page, limit);

        res.status(200).json({
            success: true,
            ...result
        });

    } catch (error) {

        next(error);
    }
}

async function getPermissionByUUId(req, res, next) {

    try {

        const uuid = req.params.uuid;

        const permission =
            await service.getPermissionByUUId(uuid);

        res.status(200).json({
            success: true,
            data: permission
        });

    } catch (error) {

        next(error);
    }
}

async function createPermission(req, res, next) {

    try {

        const permission =
            await service.createPermission(req.body);

        res.status(201).json({
            success: true,
            message: "Permiso creado correctamente",
            data: permission
        });

    } catch (error) {

        next(error);
    }
}

async function updatePermission(req, res, next) {

    try {

        const uuid = req.params.uuid;

        const permission =
            await service.updatePermission(
                uuid,
                req.body
            );

        res.status(200).json({
            success: true,
            message: "Permiso actualizado correctamente",
            data: permission
        });

    } catch (error) {

        next(error);
    }
}

async function deletePermission(req, res, next) {

    try {

        const uuid = req.params.uuid;

        const result =
            await service.deletePermission(uuid);

        res.status(200).json({
            success: true,
            ...result
        });

    } catch (error) {

        next(error);
    }
}

module.exports = {
    getPermissions,
    getPermissionByUUId,
    createPermission,
    updatePermission,
    deletePermission
};