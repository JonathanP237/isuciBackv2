import { getCiclistasLibresByGeneroAndEspecialidad } from '../services/userService.js';
import { updateUser } from '../models/userModel.js';

export const getCiclistasLibres = async (req, res) => {
  const { genero, especialidad } = req.body;

  if (!genero || !especialidad) {
    return res.status(400).json({ message: "Falta el genero o la especialidad en la solicitud." });
  }

  try {
    const ciclistasLibres = await getCiclistasLibresByGeneroAndEspecialidad(genero, especialidad);
    res.json(ciclistasLibres);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const editarUsuario = async (req, res) => {
  const { id, updateData } = req.body;

  if (!id || !updateData) {
    return res.status(400).json({ message: "Falta el id o los datos a actualizar en la solicitud." });
  }

  try {
    await updateUser(id, updateData);
    res.json({ message: "Usuario actualizado correctamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}
