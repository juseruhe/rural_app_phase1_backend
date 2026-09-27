function notFoundMiddleware(req, res) {

    res.status(404).json({

        success: false,

        error: {
            code: "ROUTE_NOT_FOUND",
            message:
                `Ruta no encontrada: ${req.method} ${req.originalUrl}`
        }
    });
}

module.exports = notFoundMiddleware;