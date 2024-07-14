import express from 'express';
import {registroCarrera, getCarreras} from '../controllers/raceController.js';

const router = express.Router();

router.post('/registro-carrera', registroCarrera);
router.get('/carreras', getCarreras);

export default router;