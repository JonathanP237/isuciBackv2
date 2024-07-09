import { validarDatosPerfil } from '../services/userService.js';

export function getPerfil(req, res) {
  return validarDatosPerfil(res);
}
