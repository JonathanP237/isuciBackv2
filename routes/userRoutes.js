import express from 'express';
import { getCiclistasLibres } from '../controllers/userController.js';

const router = express.Router();

router.post('/ciclistas-libres', getCiclistasLibres);

export default router;
