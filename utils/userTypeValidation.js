export function ValidarNombreEscuadra(escuadra) {
    // Validación de nombre de escuadra
    return escuadra && escuadra.length > 0;
  }
  
  export function ValidarEspecialidad(especialidad) {
    // Validación de especialidad
    const especialidadesValidas = ['Sprinter', 'Grimpeur', 'Rodador', 'Contrarrelojista'];
    return especialidadesValidas.includes(especialidad);
  }
  