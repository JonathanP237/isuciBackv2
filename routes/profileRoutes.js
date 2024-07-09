import express from 'express';
import { getPerfil } from '../controllers/profileController.js';

const router = express.Router();

router.get('/perfil', getPerfil);

export default router;
