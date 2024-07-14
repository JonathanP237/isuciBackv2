import express from 'express';
import { crearEscuadra } from '../controllers/squadController.js';
import { registroEscuadra } from '../controllers/squadController.js';

const router = express.Router();

router.post('/crear-escuadra', crearEscuadra);
router.post('/registro-escuadra', registroEscuadra);

export default router;
