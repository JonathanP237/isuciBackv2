import { autUsuario, validarTipoUsuario, validarTipo, getUsuarioLogin} from '../services/authService.js';
import { enviarCorreoConfirmacion } from '../services/emailService.js';
import pool from '../config/dbConfig.js';
import bcrypt from 'bcrypt';

const saltRounds = 10;

export async function login(req, res) {
  try {
    const { usuario, password } = req.body;

    if (!usuario || !password) {
      return res.status(400).json({ message: "Falta el usuario o la contraseña." });
    }

    const userAuthenticated = await autUsuario(usuario, password);

    if (!userAuthenticated) {
      return res.status(401).json({ message: "Usuario o contraseña incorrectos." });
    }

    return res.json(await validarTipoUsuario(getUsuarioLogin));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

export async function register(req, res) {
  const { contrasenausuario, tipousuario } = req.body;
  const idtipousuario = await validarTipo(tipousuario);

  try {
    const hashedPassword = await bcrypt.hash(contrasenausuario, saltRounds);
    const valores = [
      parseInt(req.body.iddocumento, 10), parseInt(req.body.iddocumento, 10), parseInt(idtipousuario, 10), null, null, 0, req.body.documentousuario, req.body.nombreusuario,
      req.body.apellidousuario, req.body.generousuario, req.body.fechanacimiento, req.body.correousuario, hashedPassword,
      req.body.nacionalidad, null, null, null, null, null, null, req.body.fechainiciocarrera, null
    ];

    const sql = `INSERT INTO USUARIO (
      IDUSUARIO, IDDOCUMENTO, IDTIPOUSUARIO, IDTIPOCONTEXTURA, IDESPECIALIDAD, IDESCUADRA, DOCUMENTOUSUARIO,
      NOMBREUSUARIO, APELLIDOUSUARIO, GENEROUSUARIO, FECHANACIMIENTO, CORREOUSUARIO, CONTRASENAUSUARIO, NACIONALIDAD,
      PESOUSUARIO, POTENCIAUSUARIO, ACELARACIONUSUARIO, VELOCIDADPROMEDIOUSUARIO, VELOCIDADMAXIMAUSUARIO, TIEMPOCICLISTA, FECHAINICIOCARRERA, GRADORAMPA
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)`;

    await pool.query(sql, valores);
    res.json({ message: "Registro exitoso." });
    await enviarCorreoConfirmacion(req.body);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al realizar el registro. Intente de nuevo." });
  }
}
