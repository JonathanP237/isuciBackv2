import pool from '../config/dbConfig.js';

export async function registrarEscuadra(id,desc,idPais) {
    const sql = `insert into escuadra (idescuadra, desescuadra, tiempoescuadra, pais) values ($1, $2, $3, $4)`;
    const result = await pool.query(sql, [id,desc,0,idPais]);
    return result.json({ message: "Escuadra creada" });
}