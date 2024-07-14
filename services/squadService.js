import pool from '../config/dbConfig.js';

export async function registrarEscuadra(id,desc,idPais) {
    const sql = `insert into escuadras (idescuadra, desescuadra, tiempoescuadra, pais) values ($1, $2, $3, $4)`;
    const result = await pool.query(sql, [id,desc,0,idPais]);
    return { message: "Escuadra creada" };
}

export async function getEscuadras() {
    const sql = await pool.query('SELECT * FROM escuadras');
    const result = sql.rows;
    return result;
}

export async function getMiembrosEscuadra(id) {
    const sql = await pool.query('SELECT * FROM miembros WHERE idescuadra = $1', [id]);
    const result = sql.rows;
    return result;
}

