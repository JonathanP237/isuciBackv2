import {getTotalCarreras, registrarCarrera} from '../services/raceService.js';

export const registroCarrera = async (req, res) => {
    const { idcarrera, pais,descarrera,duracioncarrera,longitud } = req.body;
    if (!idcarrera || !pais || !descarrera || !duracioncarrera || !longitud) {
        return res.status(400).json({ message: "Falta el id, el pais, la descripcion, la duracion o la longitud en la solicitud." });
    }
    try{
        const result = await registrarCarrera(idcarrera, pais,descarrera,duracioncarrera,longitud);
        res.json(result);
    }catch(error){
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
}

export const getCarreras = async (req, res) => {
    try{
        const result = await getTotalCarreras();
        res.json(result);
    }catch(error){
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
}