import express from 'express';
import { registroEscuadra, getEscuadras, getMiembrosEscuadras, asignarMiembrosEscuadras, actualizarTiempoEscuadra } from '../controllers/squadController.js';

const router = express.Router();

router.post('/registro-escuadra', registroEscuadra);
router.get('/escuadras', getEscuadras);
router.post('/miembros-escuadra', getMiembrosEscuadras);
router.post('/asignar-miembros', asignarMiembrosEscuadras);
router.post('/actualizar-tiempo', actualizarTiempoEscuadra);

export default router;
