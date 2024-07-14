import {registrarEscuadra, getTotalEscuadras, getMiembrosEscuadra, actualizarMiembroEscuadra} from '../services/squadService.js';
import {validarEspecialidad} from '../utils/userTypeValidation.js';

export const registroEscuadra = async (req, res) => {
  const { id, desc, pais } = req.body;
  if (!id || !desc || !pais) {
    return res.status(400).json({ message: "Falta el id, la descripcion o el id del pais en la solicitud." });
  }
  try{
    const result = await registrarEscuadra(id,desc,pais);
    res.json(result);
  }catch(error){
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

export const getEscuadras = async (req, res) => {
  try{
    const result = await getTotalEscuadras();
    res.json(result);
  }catch(error){
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

export const getMiembrosEscuadras = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Falta el id de la escuadra en la solicitud." });
  }
  try {
    let result = await getMiembrosEscuadra(id);
    // Transformar la especialidad de cada miembro con await
    result = await Promise.all(result.map(async miembro => ({
      ...miembro,
      idespecialidad: await validarEspecialidad(miembro.idespecialidad),
    })));
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const asignarMiembrosEscuadras = async (req, res) => {
  const { idUsuario, idEscuadraNuevo } = req.body;
  if (!idUsuario || !idEscuadraNuevo) {
    return res.status(400).json({ message: "Falta el id del usuario o el id de la escuadra en la solicitud." });
  }
  try{
    const result = await actualizarMiembroEscuadra(idUsuario, idEscuadraNuevo);
    res.json(result);
  }catch(error){
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}