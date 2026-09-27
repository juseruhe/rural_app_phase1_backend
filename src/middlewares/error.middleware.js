function errorMiddleware(error, req, res, next) {

    console.error("=================================");
    console.error("ERROR");
    console.error("=================================");
    console.error("Method:", req.method);
    console.error("URL:", req.originalUrl);
    console.error("Message:", error.message);
    console.error("Code:", error.code);
    console.error("Stack:", error.stack);
    console.error("=================================");

    // Error operacional propio de la aplicación
    if (error.isOperational) {

        return res.status(
            error.statusCode || 500
        ).json({
            success: false,

            error: {
                code: error.code,
                message: error.message
            }
        });
    }

    // Error MySQL
    if (error.code === "ER_DUP_ENTRY") {

        return res.status(409).json({
            success: false,

            error: {
                code: "DATABASE_DUPLICATE",
                message: "El registro ya existe"
            }
        });
    }

    if (
        error.code === "ER_NO_REFERENCED_ROW_2"
    ) {

        return res.status(400).json({
            success: false,

            error: {
                code: "DATABASE_FOREIGN_KEY",
                message:
                    "La referencia relacionada no existe"
            }
        });
    }

    // Error inesperado
    return res.status(500).json({
        success: false,

        error: {
            code: "INTERNAL_SERVER_ERROR",
            message: "Error interno del servidor"
        }
    });
}

module.exports = errorMiddleware;