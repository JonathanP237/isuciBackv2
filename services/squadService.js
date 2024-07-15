import DBPool from './dbConfig';

const pool = new DBPool();

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
    const sql = await pool.query('SELECT iddocumento, nombreusuario, apellidousuario, idespecialidad FROM usuario WHERE idescuadra = $1', [id]);
    const result = sql.rows;
    return result;
}

export async function actualizarMiembroEscuadra(idUsuario, idEscuadraNuevo) {
    const sql = `UPDATE usuario SET idescuadra = $1 WHERE iddocumento = $2`;
    const result = await pool.query(sql, [parseInt(idEscuadraNuevo,10), parseInt(idUsuario,10)]);
    if (result.rowCount === 0) {
        // No se encontró el usuario o no se realizó la actualización
        return { message: "Usuario no encontrado o no se pudo actualizar." };
    }
    return { message: "Miembro asignado con éxito." };
}

export async function actualizarTiempoEscuadra(idEscuadra, tiempo) {
    // Paso 1: Obtener el tiempo actual de la escuadra
    const sqlSelect = `SELECT tiempoescuadra FROM escuadras WHERE idescuadra = $1`;
    const result = await pool.query(sqlSelect, [parseInt(idEscuadra,10)]);
    if (result.rows.length === 0) {
        throw new Error('Escuadra no encontrada.');
    }
    const tiempoActual = result.rows[0].tiempoescuadra;

    // Paso 2: Sumar el tiempo proporcionado al tiempo actual
    const nuevoTiempo = tiempoActual + tiempo;

    // Paso 3: Actualizar el tiempo de la escuadra en la base de datos
    const sqlUpdate = `UPDATE escuadras SET tiempoescuadra = $1 WHERE idescuadra = $2`;
    await pool.query(sqlUpdate, [nuevoTiempo, idEscuadra]);

    return { message: "Tiempo actualizado." };
}