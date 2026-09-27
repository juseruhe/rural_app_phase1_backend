const service = require("./role.service");

async function getRoles(req, res, next) {

    try {

        const page = Number(req.query.page || 1);
        const limit = Number(req.query.limit || 10);

        const result =
            await service.getRoles(page, limit);

        res.status(200).json({
            success: true,
            ...result
        });

    } catch (error) {

        next(error);
    }
}

async function getRoleById(req, res, next) {

    try {

        const id = Number(req.params.id);

        const role =
            await service.getRoleById(id);

        res.status(200).json({
            success: true,
            data: role
        });

    } catch (error) {

        next(error);
    }
}

async function createRole(req, res, next) {

    try {

        const role =
            await service.createRole(req.body);

        res.status(201).json({
            success: true,
            message: "Rol creado correctamente",
            data: role
        });

    } catch (error) {

        next(error);
    }
}

async function updateRole(req, res, next) {

    try {

        const id = Number(req.params.id);

        const role =
            await service.updateRole(
                id,
                req.body
            );

        res.status(200).json({
            success: true,
            message: "Rol actualizado correctamente",
            data: role
        });

    } catch (error) {

        next(error);
    }
}

async function deleteRole(req, res, next) {

    try {

        const id = Number(req.params.id);

        const result =
            await service.deleteRole(id);

        res.status(200).json({
            success: true,
            ...result
        });

    } catch (error) {

        next(error);
    }
}

module.exports = {
    getRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole
};