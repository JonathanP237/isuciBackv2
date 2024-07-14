import express from 'express';
import { registroEscuadra, getEscuadras, getMiembrosEscuadras, asignarMiembrosEscuadras } from '../controllers/squadController.js';

const router = express.Router();

router.post('/registro-escuadra', registroEscuadra);
router.get('/escuadras', getEscuadras);
router.post('/miembros-escuadra', getMiembrosEscuadras);
router.post('/asignar-miembros', asignarMiembrosEscuadras);

export default router;
