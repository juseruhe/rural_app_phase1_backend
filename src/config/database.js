const mysql = require("mysql2/promise");
const env = require("./env");

const pool = mysql.createPool({
    host: env.database.host,
    port: env.database.port,
    database: env.database.name,
    user: env.database.user,
    password: env.database.password,

    waitForConnections: true,
    connectionLimit: env.database.connectionLimit,
    queueLimit: 0
});

async function testDatabaseConnection() {
    const connection = await pool.getConnection();

    try {
        await connection.ping();
        console.log("MySQL conectado correctamente");
    } finally {
        connection.release();
    }
}

module.exports = {
    pool,
    testDatabaseConnection
};