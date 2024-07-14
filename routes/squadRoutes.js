import express from 'express';
import { registroEscuadra, getEscuadras, getMiembrosEscuadra } from '../controllers/squadController.js';

const router = express.Router();

router.post('/registro-escuadra', registroEscuadra);
router.get('/escuadras', getEscuadras);
router.post('/miembros-escuadra', getMiembrosEscuadra);

export default router;
