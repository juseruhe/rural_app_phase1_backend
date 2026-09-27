require("dotenv").config();

const env = {
    nodeEnv: process.env.NODE_ENV || "development",

    port: Number(process.env.PORT || 3000),

    database: {
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT || 3306),
        name: process.env.DB_NAME || "rural_app",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "",
        connectionLimit: Number(
            process.env.DB_CONNECTION_LIMIT || 10
        )
    }
};

module.exports = env;