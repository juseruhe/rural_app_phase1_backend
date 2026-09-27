const express = require("express");

const {
    body,
    param,
    query,
    validationResult
} = require("express-validator");

const controller = require("./role.controller");

const router = express.Router();

function validate(req, res, next) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return res.status(400).json({
            success: false,
            error: {
                code: "VALIDATION_ERROR",
                message: "Datos inválidos",
                details: errors.array()
            }
        });
    }

    next();
}

const idValidation = [
    param("id")
        .isInt({ min: 1 })
        .withMessage("El id debe ser un número entero positivo")
];

const createValidation = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("El nombre es obligatorio")
        .isLength({ max: 100 })
        .withMessage("El nombre no puede superar 100 caracteres"),

    body("description")
        .optional({ nullable: true })
        .isLength({ max: 255 })
        .withMessage(
            "La descripción no puede superar 255 caracteres"
        ),

    body("active")
        .optional()
        .isBoolean()
        .withMessage("active debe ser booleano"),

    validate
];

const updateValidation = [

    ...idValidation,

    body("name")
        .trim()
        .notEmpty()
        .withMessage("El nombre es obligatorio")
        .isLength({ max: 100 })
        .withMessage("El nombre no puede superar 100 caracteres"),

    body("description")
        .optional({ nullable: true })
        .isLength({ max: 255 })
        .withMessage(
            "La descripción no puede superar 255 caracteres"
        ),

    body("active")
        .isBoolean()
        .withMessage("active debe ser booleano"),

    validate
];

const paginationValidation = [

    query("page")
        .optional()
        .isInt({ min: 1 })
        .withMessage("page debe ser mayor o igual a 1"),

    query("limit")
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage("limit debe estar entre 1 y 100"),

    validate
];

router.get(
    "/",
    paginationValidation,
    controller.getRoles
);

router.get(
    "/:id",
    idValidation,
    validate,
    controller.getRoleById
);

router.post(
    "/",
    createValidation,
    controller.createRole
);

router.put(
    "/:id",
    updateValidation,
    controller.updateRole
);

router.delete(
    "/:id",
    idValidation,
    validate,
    controller.deleteRole
);

module.exports = router;