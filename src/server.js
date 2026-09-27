const app = require("./app");

const env = require("./config/env");

const {
    testDatabaseConnection
} = require("./config/database");

async function startServer() {

    try {

        await testDatabaseConnection();

        app.listen(
            env.port,
            () => {

                console.log(
                    `Rural App ejecutándose en puerto ${env.port}`
                );

                console.log(
                    `http://localhost:${env.port}`
                );

                console.log(
                    `Documentación Scalar: http://localhost:${env.port}/docs`
                );
            }
        );

    } catch (error) {

        console.error(
            "No fue posible iniciar Rural App"
        );

        console.error(error);

        process.exit(1);
    }
}

startServer();