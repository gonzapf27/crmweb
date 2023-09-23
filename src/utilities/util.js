export function obtenerDatosGuardados(nombre) {
    try {
      // Obtiene la cadena de texto del almacenamiento local
      const objetoSerializado = localStorage.getItem(nombre);
      // Convierte la cadena de texto a un objeto utilizando JSON.parse()
      return JSON.parse(objetoSerializado);
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  