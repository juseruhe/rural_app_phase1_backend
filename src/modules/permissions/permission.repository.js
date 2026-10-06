const { pool } = require("../../config/database");

async function findAll({ page, limit }) {

    const offset = (page - 1) * limit;

    const [rows] = await pool.execute(
        `
        SELECT
            uuid,
            name,
            description,
            active,
            created_at,
            updated_at
        FROM permissions
        ORDER BY created_at DESC
        LIMIT ? OFFSET ?
        `,
        [limit, offset]
    );

    const [countRows] = await pool.execute(
        `
        SELECT COUNT(*) AS total
        FROM permissions
        `
    );

    return {
        data: rows,
        total: countRows[0].total
    };
}

async function findByUuid(uuid) {

    const [rows] = await pool.execute(
        `
        SELECT
            uuid,
            name,
            description,
            active,
            created_at,
            updated_at
        FROM permissions
        WHERE uuid = ?
        `,
        [uuid]
    );

    return rows[0] || null;
}

async function findByName(name) {

    const [rows] = await pool.execute(
        `
        SELECT
            uuid,
            name,
            description,
            active,
            created_at,
            updated_at
        FROM permissions
        WHERE name = ?
        `,
        [name]
    );

    return rows[0] || null;
}

async function create({ uuid,name, description, active }) {

    const [result] = await pool.execute(
        `
        INSERT INTO permissions
        (
            uuid,
            name,
            description,
            active
        )
        VALUES (?, ?, ?, ?)
        `,
        [
            uuid,
            name,
            description,
            active
        ]
    );

    return findByUuid(uuid);
}

async function update(uuid, { name, description, active }) {

    await pool.execute(
        `
        UPDATE permissions
        SET
            name = ?,
            description = ?,
            active = ?
        WHERE uuid = ?
        `,
        [
            name,
            description,
            active,
            uuid
        ]
    );

    return findByUuid(uuid);
}

async function remove(uuid) {

    const [result] = await pool.execute(
        `
        DELETE FROM permissions
        WHERE uuid = ?
        `,
        [uuid]
    );

    return findByUuid(uuid);
}

async function remove(uuid) {

    const [result] = await pool.execute(
        `
        DELETE FROM permissions
        WHERE uuid = ?
        `,
        [uuid]
    );

    return result.affectedRows;
}

module.exports = {
    findAll,
    findByUuid,
    findByName,
    create,
    update,
    remove
};