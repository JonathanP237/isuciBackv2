import express from 'express';
import { getCiclistasLibres } from '../controllers/userController.js';

const router = express.Router();

router.get('/ciclistas-libres', getCiclistasLibres);

export default router;
