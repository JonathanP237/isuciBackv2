import bcrypt from 'bcrypt';
import DBPool from './dbConfig';

const pool = new DBPool();

let usuarioLogin = null;

export async function autUsuario(usuario, contrasenaIngresada) {
  const result = await pool.query("SELECT * FROM usuario WHERE iddocumento = $1 LIMIT 1", [usuario]);

  if (result.rows.length > 0) {
    const user = result.rows[0];
    usuarioLogin = user;
    console.log("Usuario actual: ", usuarioLogin.iddocumento);
    const passwordMatch = await bcrypt.compare(contrasenaIngresada, user.contrasenausuario);
    if (passwordMatch && usuarioLogin.idtipousuario !== undefined) {
      return passwordMatch;
    } else {
      throw new Error("Usuario actual no válido o idtipousuario no definido");
    }
  }
  return false;
}

export async function validarTipoUsuario(usuarioLogin) {
  if (!usuarioLogin) {
    throw new Error("Usuario actual no válido o idtipousuario no definido");
  }

  const tiposDeUsuario = {
    1: "Masajista",
    2: "Administrador",
    3: "Director",
    4: "Ciclista"
  };

  return tiposDeUsuario[usuarioLogin.idtipousuario] || "Ciclista";
}

export async function validarTipo(tipousuario){
  console.log(tipousuario);
  let idtipousuario = 0;
  if(tipousuario == "Masajista"){
    idtipousuario = 1;
  }else if(tipousuario == "Administrador"){
    idtipousuario = 2;
  }else if(tipousuario == "Director de escuadra"){
    idtipousuario = 3;
  }else if(tipousuario == "Ciclista"){
    idtipousuario = 4;
  }
  return idtipousuario;
}

export function getUsuarioLogin() {
  return usuarioLogin;
}