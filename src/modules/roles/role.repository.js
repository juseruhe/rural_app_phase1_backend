const { pool } = require("../../config/database");

async function findAll({ page, limit }) {

    const offset = (page - 1) * limit;

    const [rows] = await pool.execute(
        `
        SELECT
            id,
            name,
            description,
            active,
            created_at,
            updated_at
        FROM roles
        ORDER BY id DESC
        LIMIT ? OFFSET ?
        `,
        [limit, offset]
    );

    const [countRows] = await pool.execute(
        `
        SELECT COUNT(*) AS total
        FROM roles
        `
    );

    return {
        data: rows,
        total: countRows[0].total
    };
}

async function findById(id) {

    const [rows] = await pool.execute(
        `
        SELECT
            id,
            name,
            description,
            active,
            created_at,
            updated_at
        FROM roles
        WHERE id = ?
        `,
        [id]
    );

    return rows[0] || null;
}

async function findByName(name) {

    const [rows] = await pool.execute(
        `
        SELECT
            id,
            name,
            description,
            active,
            created_at,
            updated_at
        FROM roles
        WHERE name = ?
        `,
        [name]
    );

    return rows[0] || null;
}

async function create({ name, description, active }) {

    const [result] = await pool.execute(
        `
        INSERT INTO roles
        (
            
            name,
            description,
            active
        )
        VALUES (?, ?, ?)
        `,
        [
            name,
            description,
            active
        ]
    );

    return findById(result.insertId);
}

async function update(id, { name, description, active }) {

    await pool.execute(
        `
        UPDATE roles
        SET
            name = ?,
            description = ?,
            active = ?
        WHERE id = ?
        `,
        [
            name,
            description,
            active,
            id
        ]
    );

    return findById(id);
}

async function remove(id) {

    const [result] = await pool.execute(
        `
        DELETE FROM roles
        WHERE id = ?
        `,
        [id]
    );

    return result.affectedRows;
}

module.exports = {
    findAll,
    findById,
    findByName,
    create,
    update,
    remove
};