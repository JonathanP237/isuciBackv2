import pool from '../config/dbConfig.js';

export async function getUserById(id) {
  const result = await pool.query('SELECT * FROM usuario WHERE idusuario = $1', [id]);
  return result.rows[0];
}

export async function createUser(userData) {
  const { id, idDocumento, idTipoUsuario, nombre, apellido, genero, fechaNacimiento, correo, contrasena, nacionalidad } = userData;
  const sql = `
    INSERT INTO usuario (
      idusuario, iddocumento, idtipousuario, nombreusuario, apellidousuario,
      generousuario, fechanacimiento, correousuario, contrasenausuario, nacionalidad
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
  `;
  const values = [id, idDocumento, idTipoUsuario, nombre, apellido, genero, fechaNacimiento, correo, contrasena, nacionalidad];
  await pool.query(sql, values);
}

export async function updateUser(id, updateData) {
  const fields = Object.keys(updateData).map((key, index) => `${key} = $${index + 2}`).join(', ');
  const values = Object.values(updateData);
  values.unshift(id);

  const sql = `UPDATE usuario SET ${fields} WHERE idusuario = $1`;
  await pool.query(sql, values);
}

export async function deleteUser(id) {
  const sql = 'DELETE FROM usuario WHERE idusuario = $1';
  await pool.query(sql, [id]);
}
