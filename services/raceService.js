import pool from '../config/dbConfig.js';

export async function registrarCarrera(idcarrera, pais,descarrera,duracioncarrera,longitud){
    const sql = `insert into carreras (idcarrera, pais,descarrera,duracioncarrera,longitud) values ($1, $2, $3, $4, $5)`;
    const result = await pool.query(sql, [idcarrera, pais,descarrera,duracioncarrera,longitud]);
    return { message: "Carrera creada" };
}

export async function getTotalCarreras() {
    const sql = await pool.query('SELECT * FROM carreras');
    const result = sql.rows;
    return result;
}