export function crearEscuadra(req, res) {
    return res.json({ message: "Escuadra creada" });
  }
  
  export function getCiclistasLibres(req, res) {
    const sql = `SELECT nombreusuario, apellidousuario, iddocumento, idespecialidad, nacionalidad FROM usuario WHERE idtipousuario = 4 AND idescuadra = 0`;
    pool.query(sql, (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al obtener los ciclistas." });
      }
      res.json(result.rows);
    });
  }
  