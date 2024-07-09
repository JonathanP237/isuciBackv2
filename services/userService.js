import { getUserById, createUser, updateUser, deleteUser } from '../models/userModel.js';
import { ValidarNombreEscuadra, ValidarEspecialidad } from '../utils/userTypeValidation.js';
import pool from '../config/dbConfig.js';
import {getUsuarioLogin} from './authService.js';

export async function validarDatosPerfil(res) {
  try {        
    const result = await pool.query("SELECT * FROM usuario WHERE iddocumento = $1 LIMIT 1", [parseInt(getUsuarioLogin().iddocumento,10)]);
    
    if (result.rows.length === 0) {
      throw new Error("Usuario no encontrado");      
    }
    const usuarioActual = result.rows[0];
    console.log(usuarioActual.idtipousuario);
    const idTipoUsuario = parseInt(usuarioActual.idtipousuario);
    const nombreEscuadra = await ValidarNombreEscuadra(usuarioActual.idescuadra);
    const nombreEspecialidad = await ValidarEspecialidad(usuarioActual.idespecialidad);
    switch (idTipoUsuario) {
      case 1:
      case 3:
        res.json({
          idtipousuario: usuarioActual.idtipousuario,
          nombreusuario: usuarioActual.nombreusuario,
          apellidousuario: usuarioActual.apellidousuario,
          iddocumento: usuarioActual.iddocumento,
          correousuario: usuarioActual.correousuario,
          idpais: usuarioActual.nacionalidad,
          telefonousuario: usuarioActual.telefonousuario,
          direccionusuario: usuarioActual.direccionusuario,
          idescuadra: usuarioActual.idescuadra,
          anosexperiencia: usuarioActual.fechainiciocarrera,
          nombreEscuadra: nombreEscuadra
        });
        break;
      case 4:
        res.json({
          idtipousuario: usuarioActual.idtipousuario,
          nombreusuario: usuarioActual.nombreusuario,
          apellidousuario: usuarioActual.apellidousuario,
          iddocumento: usuarioActual.iddocumento,
          correousuario: usuarioActual.correousuario,
          idpais: usuarioActual.nacionalidad,
          telefonousuario: usuarioActual.telefonousuario,
          direccionusuario: usuarioActual.direccionusuario,
          idescuadra: usuarioActual.idescuadra,
          idtipocontextura: usuarioActual.idtipocontextura,
          idespecialidad: usuarioActual.idespecialidad,
          generousuario: usuarioActual.generousuario,
          pesousuario: usuarioActual.pesousuario,
          potenciausuario: usuarioActual.potenciausuario,
          acelaracionusuario: usuarioActual.acelaracionusuario,
          velocidadpromediousuario: usuarioActual.velocidadpromediousuario,
          velocidadmaximausuario: usuarioActual.velocidadmaximausuario,
          tiempociclista: usuarioActual.tiempociclista,
          anosexperiencia: usuarioActual.fechainiciocarrera,
          gradorampa: usuarioActual.gradorampa,
          nombreEscuadra: nombreEscuadra,
          nombreEspecialidad: nombreEspecialidad
        });
        break;
      case 2:
        res.json({
          idtipousuario: usuarioActual.idtipousuario,
          nombreusuario: usuarioActual.nombreusuario,
          apellidousuario: usuarioActual.apellidousuario,
          iddocumento: usuarioActual.iddocumento,
          correousuario: usuarioActual.correousuario,
          idpais: usuarioActual.nacionalidad,
          telefonousuario: usuarioActual.telefonousuario,
          direccionusuario: usuarioActual.direccionusuario,
        });
        break;
      default:
        res.json({ message: "Tipo usuario incorrecto." });
        break;
    }
  } catch (error) {
    console.error(error.message);
    res.status(404).json({ message: error.message });
  }
}

export async function crearUsuario(userData) {
  try {
    await createUser(userData);
  } catch (error) {
    console.error(error);
    throw new Error('Error al crear el usuario.');
  }
}

export async function actualizarUsuario(id, updateData) {
  try {
    await updateUser(id, updateData);
  } catch (error) {
    console.error(error);
    throw new Error('Error al actualizar el usuario.');
  }
}

export async function eliminarUsuario(id) {
  try {
    await deleteUser(id);
  } catch (error) {
    console.error(error);
    throw new Error('Error al eliminar el usuario.');
  }
}
