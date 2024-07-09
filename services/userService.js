import { getUserById, createUser, updateUser, deleteUser } from '../models/userModel.js';
import { ValidarNombreEscuadra, ValidarEspecialidad } from '../utils/userTypeValidation.js';

export async function validarDatosPerfil(res) {
  try {
    const user = await getUserById(res.locals.userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el perfil del usuario.' });
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
