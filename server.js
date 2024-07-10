import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import squadRoutes from './routes/squadRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { setupSwagger } from './utils/swagger.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

// Rutas
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/squad', squadRoutes);
app.use('/users', userRoutes);

// Configurar Swagger
setupSwagger(app);

// Middleware de manejo de errores
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
