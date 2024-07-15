import express from 'express';
import { getCiclistasLibres, editarUsuario } from '../controllers/userController.js';

const router = express.Router();

router.post('/ciclistas-libres', getCiclistasLibres);
router.post('/editar-usuario', editarUsuario);

export default router;
