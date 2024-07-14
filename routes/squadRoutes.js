import express from 'express';
import { registroEscuadra } from '../controllers/squadController.js';

const router = express.Router();

router.post('/registro-escuadra', registroEscuadra);

export default router;
