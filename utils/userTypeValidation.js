import pool from '../config/dbConfig.js';

export async function ValidarNombreEscuadra(idescuadra){
  try {
    const result = await pool.query("SELECT * FROM escuadras WHERE idescuadra = $1 LIMIT 1", [idescuadra]);
    if (result.rows.length === 0) {
      throw new Error("No registra escuadra");
    }
    const nombreEscuadra = result.rows[0].desescuadra;
    return nombreEscuadra;
  } catch (error) {
    // Aquí puedes manejar el error como prefieras, por ejemplo, devolver un mensaje de error
    console.error(error.message);
    return error.message; // O manejarlo de otra manera
  }
}
  
  export async function ValidarEspecialidad(idespecialidad){
    try {
      const result = await pool.query("SELECT * FROM especialidades WHERE idespecialidad = $1 LIMIT 1", [idespecialidad]);
      if (result.rows.length === 0) {
        throw new Error("Especialidad no encontrada");
      }
      const nombreEspecialidad = result.rows[0].desespecialidad;
      return nombreEspecialidad;
    } catch (error) {
      // Aquí puedes manejar el error como prefieras, por ejemplo, devolver un mensaje de error
      console.error(error.message);
      return "No registrado en ninguna"; // O manejarlo de otra manera
    }
  }

  export async function ValidarAñosExperiencia(fechainiciocarrera){
    const fechaActual = new Date();
    return fechaActual.getFullYear() - fechainiciocarrera.getFullYear();
  }

  export async function validarTipoContextura(idtipocontextura){
    try {
      const result = await pool.query("SELECT * FROM tipocontextura WHERE idtipocontextura = $1 LIMIT 1", [idtipocontextura]);
      if (result.rows.length === 0) {
        throw new Error("Tipo contextura no encontrado");
      }
      const nombreTipoContextura = result.rows[0].destipocontextura;
      return nombreTipoContextura;
    } catch (error) {
      // Aquí puedes manejar el error como prefieras, por ejemplo, devolver un mensaje de error
      console.error(error.message);
      return "No registrado en ninguna"; // O manejarlo de otra manera
    }
  }
  