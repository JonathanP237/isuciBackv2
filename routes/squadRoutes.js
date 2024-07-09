import express from 'express';
import { crearEscuadra, getCiclistasLibres } from '../controllers/squadController.js';

const router = express.Router();

router.post('/crear-escuadra', crearEscuadra);
router.get('/ciclistasLibres', getCiclistasLibres);

export default router;
