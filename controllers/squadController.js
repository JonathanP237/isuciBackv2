import {registrarEscuadra, getEscuadras} from '../services/squadService.js';

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
    const result = await getEscuadras();
    res.json(result);
  }catch(error){
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

export const getMiembrosEscuadra = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Falta el id de la escuadra en la solicitud." });
  }
  try{
    const result = await getMiembrosEscuadra(id);
    res.json(result);
  }catch(error){
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}