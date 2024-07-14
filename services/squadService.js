import pool from '../config/dbConfig.js';

export async function registrarEscuadra(id,desc,idPais) {
    const sql = `insert into escuadras (idescuadra, desescuadra, tiempoescuadra, pais) values ($1, $2, $3, $4)`;
    const result = await pool.query(sql, [id,desc,0,idPais]);
    return { message: "Escuadra creada" };
}

export async function getTotalEscuadras() {
    const sql = await pool.query('SELECT * FROM escuadras');
    const result = sql.rows;
    return result;
}

export async function getMiembrosEscuadra(id) {
    const sql = await pool.query('SELECT * FROM usuario WHERE idescuadra = $1', [id]);
    const result = sql.rows;
    return result;
}

export async function actualizarMiembroEscuadra(idUsuario, idEscuadraNuevo) {
    const sql = `UPDATE usuario SET idescuadra = $1 WHERE idusuario = $2`;
    const result = await pool.query(sql, [idEscuadraNuevo, idUsuario]);
    if (result.rowCount === 0) {
        // No se encontró el usuario o no se realizó la actualización
        return { message: "Usuario no encontrado o no se pudo actualizar." };
    }
    return { message: "Miembro asignado con éxito." };
}