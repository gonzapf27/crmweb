<template>
  <div>
    <hr>
    <hr>
    <!--Sección para las oportunidades de venta-->
    <div>
      <fieldset name="fieldsetMostrarColumnasOportunidades">
        <h4 style="color: blue">
          Mostrar columnas
        </h4>
        <br>
        <!-- Primera fila de checkboxes -->
        <div class="checkbox-container">
          <label>
            <input id="checkIdAccion" type="checkbox" name="checkIdAccion" checked>
            Id
          </label>

          <label>
            <input id="checkIdOportunidad" type="checkbox" name="checkIdOportunidad">
            ID Oportunidad
          </label>

          <label>
            <input id="checkProductoOportunidad" type="checkbox" name="checkProductoOportunidad" checked>
            Producto
          </label>

          <label>
            <input id="checkEmpresaOportunidad" type="checkbox" name="checkEmpresaOportunidad" checked>
            Empresa
          </label>

          <label>
            <input id="checkIdAutorAccion" type="checkbox" name="checkIdAutorAccion">
            ID Autor
          </label>

          <label>
            <input id="checkAutorAccion" type="checkbox" name="checkAutorAccion" checked>
            Autor
          </label>


          <label>
            <input id="checkComercialAsignado" type="checkbox" name="checkComercialAsignado" checked>
            Comercial asignado
          </label>

          <label>
            <input id="checkAccionObjetivo" type="checkbox" name="checkAccionObjetivo">
            Acción Objetivo
          </label>

          <label>
            <input id="checkAccionRealizada" type="checkbox" name="checkAccionRealizada" checked>
            Acción Realizada
          </label>
        </div>

        <!-- Segunda fila de checkboxes -->
        <div class="checkbox-container">
          <label>
            <input id="checkEmitidoORecibidoAccionOportunidad" type="checkbox"
              name="checkEmitidoORecibidoAccionOportunidad" checked>
            Emitido o Recibido
          </label>

          <label>
            <input id="checkAsuntoAccionOportunidadObjetivo" type="checkbox" name="checkAsuntoAccionOportunidadObjetivo">
            Asunto Objetivo
          </label>

          <label>
            <input id="checkAsuntoAccionOportunidadRealizada" type="checkbox" name="checkAsuntoAccionOportunidadRealizada"
              checked>
            Asunto realizada
          </label>

          <label>
            <input id="checkNotasAccionOportunidadObjetivo" type="checkbox" name="checkNotasAccionOportunidadObjetivo">
            Notas objetivo
          </label>

          <label>
            <input id="checkNotasAccionOportunidadRealizada" type="checkbox" name="checkNotasAccionOportunidadRealizada"
              checked>
            Notas realizada
          </label>

          <label>
            <input id="checkRiAccionOportunidad" type="checkbox" name="checkRiAccionOportunidad">
            RI
          </label>

          <label>
            <input id="checkFechaOportunidad" type="checkbox" name="checkFechaOportunidad" checked>
            Fecha creación Oportunidad
          </label>

          <label>
            <input id="checkFechaAccionObjetivo" type="checkbox" name="checkFechaAccionObjetivo">
            Fecha acción objetivo
          </label>

          <label>
            <input id="checkFechaAccionRealizada" type="checkbox" name="checkFechaAccionRealizada" checked>
            Fecha acción realizada
          </label>

          <label>
            <input id="checkHoraAccion" type="checkbox" name="checkHoraAccion" checked>
            Hora Acción
          </label>

          <label>
            <input id="checkCompletada" type="checkbox" name="checkCompletada" checked>
            Completada
          </label>
        </div>
      </fieldset>
      <fieldset name="fieldSetFiltrosOportunidad">
        <h4 style="color: blue">
          Filtros
        </h4>
        <input id="txtIdAccion" type="text" placeholder="ID acción">
        <input id="txtIdOportunidad" type="text" placeholder="ID Oportunidad">
        <input id="txtProductoOportunidad" type="text" placeholder="Producto">
        <input id="txtEmpresaOportunidad" type="text" placeholder="Empresa">
        <input v-if="$store.state.esAdmin" id="txtAutorAccion" type="text" placeholder="Autor de la acción">
        <input v-if="$store.state.esAdmin" id="txtComercialAsignado" type="text" placeholder="Comercial asignado">
        <label for="selectFiltroAccionOportunidad">Acción</label>
        <select id="selectFiltroAccionOportunidad" v-model="accion" name="selectFiltroAccionOportunidad">
          <option value="llamada">
            Llamada telefónica
          </option>
          <option value="correo">
            Correo electrónico
          </option>
          <option value="whatsapp">
            WhatsApp
          </option>
          <option value="visita">
            Visita
          </option>
          <option value="presupuesto">
            Presupuesto terminado
          </option>
          <option value="venta">
            Venta realizada
          </option>
          <option value="contacto">
            Pasar a contacto
          </option>
          <option value="otro">
            Otro
          </option>
          <option value="todas">
            Todas
          </option>
        </select>

        <label for="opcionEmitidoORecibido">Emitido o Recibido</label>
        <select id="selectEmitidoORecibido" v-model="opcionEmitidoORecibido" name="selectEmitidoORecibido">
          <option value="todas" selected>
            Todas
          </option>
          <option value="recibido">
            Recibido
          </option>
          <option value="emitido">
            Emitido
          </option>
        </select>
        <input id="txtAsuntoAccionOportunidad" type="text" placeholder="Asunto">
        <input id="txtNotasAccionOportunidad" type="text" placeholder="Notas">
        <input id="txtRiAccionOportunidad" type="text" placeholder="RI">
        <label for="selectFiltroCompletadaAccionOportunidad">Completada</label>
        <select id="selectFiltroCompletadaAccionOportunidad" v-model="completada"
          name="selectFiltroCompletadaAccionOportunidad">
          <option value="todas" selected>
            Todas
          </option>
          <option value="si">
            Si
          </option>
          <option value="no">
            No
          </option>
        </select>
        <hr>
        <div>
          <label for="txtFechaDesdeAccionOportunidad">Fecha Desde:</label>
          <input id="txtFechaDesdeAccionOportunidad" v-model="fechaDesde" type="date">
        </div>
        <div>
          <label for="txtFechaHastaAccionOportunidad">Fecha Hasta:</label>
          <input id="txtFechaHastaAccionOportunidad" v-model="fechaHasta" type="date">
        </div>
        <hr>
        <label for="order-select">Ordenar por </label>
        <select id="order-select" v-model="selectedOrder">
          <option value="fecha_desc">
            Fecha acción (más nuevo a más antiguo)
          </option>
          <option value="fecha_asc">
            Fecha acción (más antiguo a más nuevo)
          </option>
          <option value="producto">
            Producto
          </option>
          <option value="empresa">
            Empresa
          </option>
          <option v-if="$store.state.esAdmin" value="autor">
            Autor de la acción
          </option>
          <option value="accion">
            Acción
          </option>
          <option value="ri">
            RI
          </option>
          <option value="completada">
            Completada
          </option>
        </select>
        <button id="btn_ejecutar_consulta" @click="ejecutarConsulta">
          Ejecutar consulta
        </button>
        <button class="botonExportar" @click="exportarCSV">
          Exportar tabla a CSV
        </button>
      </fieldset>
    </div>
    <!--Tabla de resultados de acciones de oportunidades de venta-->
    <div>
      <table class="custom-table">
        <thead>
          <tr>
            <th v-if="isColumnSelected('checkIdAccion')">
              ID
            </th>
            <th v-if="isColumnSelected('checkIdOportunidad')">
              ID oportunidad
            </th>
            <th v-if="isColumnSelected('checkProductoOportunidad')">
              Producto
            </th>
            <th v-if="isColumnSelected('checkEmpresaOportunidad')">
              Empresa
            </th>
            <th v-if="isColumnSelected('checkIdAutorAccion')">
              ID Autor
            </th>
            <th v-if="isColumnSelected('checkAutorAccion')">
              Autor
            </th>
            <th v-if="isColumnSelected('checkComercialAsignado')">
              Comercial asignado
            </th>
            <th v-if="isColumnSelected('checkAccionObjetivo')">
              Accion Objetivo
            </th>
            <th v-if="isColumnSelected('checkAccionRealizada')">
              Accion Realizada
            </th>
            <th v-if="isColumnSelected('checkEmitidoORecibidoAccionOportunidad')">
              Emitido o recibido
            </th>
            <th v-if="isColumnSelected('checkAsuntoAccionOportunidadObjetivo')">
              Asunto Objetivo
            </th>
            <th v-if="isColumnSelected('checkAsuntoAccionOportunidadRealizada')">
              Asunto Realizada
            </th>
            <th v-if="isColumnSelected('checkNotasAccionOportunidadObjetivo')">
              Notas Objetivo
            </th>
            <th v-if="isColumnSelected('checkNotasAccionOportunidadRealizada')">
              Notas Realizada
            </th>
            <th v-if="isColumnSelected('checkRiAccionOportunidad')">
              RI
            </th>
            <th v-if="isColumnSelected('checkFechaOportunidad')">
              Fecha Creación Oportunidad
            </th>
            <th v-if="isColumnSelected('checkFechaAccionObjetivo')">
              Fecha acción objetivo
            </th>
            <th v-if="isColumnSelected('checkFechaAccionRealizada')">
              Fecha acción realizada
            </th>
            <th v-if="isColumnSelected('checkHoraAccion')">
              Hora accion realizada
            </th>
            <th v-if="isColumnSelected('checkCompletada')">
              Completada
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="resultado in resultados" :key="resultado.idAccion">
            <td v-if="isColumnSelected('checkIdAccion')">
              {{ resultado.idAccion }}
            </td>
            <td v-if="isColumnSelected('checkIdOportunidad')">
              {{ resultado.idOportunidad }}
            </td>
            <td v-if="isColumnSelected('checkProductoOportunidad')">
              {{ resultado.productoOportunidad }}
            </td>
            <td v-if="isColumnSelected('checkEmpresaOportunidad')">
              {{ resultado.empresaOportunidad }}
            </td>
            <td v-if="isColumnSelected('checkIdAutorAccion')">
              {{ resultado.idAutor }}
            </td>
            <td v-if="isColumnSelected('checkAutorAccion')">
              {{ resultado.AutorAccion }}
            </td>
            <td v-if="isColumnSelected('checkComercialAsignado')">
              {{ resultado.comercialAsignado }}
            </td>
            <td v-if="isColumnSelected('checkAccionObjetivo')">
              {{ resultado.accionObjetivo }}
            </td>
            <td v-if="isColumnSelected('checkAccionRealizada')">
              {{ resultado.accion }}
            </td>
            <td v-if="isColumnSelected('checkEmitidoORecibidoAccionOportunidad')">
              {{ resultado.emitidoORecibidoAccion }}
            </td>
            <td v-if="isColumnSelected('checkAsuntoAccionOportunidadObjetivo')">
              {{ resultado.asuntoAccionObjetivo }}
            </td>
            <td v-if="isColumnSelected('checkAsuntoAccionOportunidadRealizada')">
              {{ resultado.asuntoAccion }}
            </td>
            <td v-if="isColumnSelected('checkNotasAccionOportunidadObjetivo')">
              {{ resultado.notasAccionObjetivo }}
            </td>
            <td v-if="isColumnSelected('checkNotasAccionOportunidadRealizada')">
              {{ resultado.notasAccion }}
            </td>
            <td v-if="isColumnSelected('checkRiAccionOportunidad')">
              {{ resultado.riAccion }}
            </td>
            <td v-if="isColumnSelected('checkFechaOportunidad')">
              {{
                formatFecha(
                  resultado.fechaDiaOportunidad,
                  resultado.fechaMesOportunidad,
                  resultado.fechaAñoOportunidad
                )
              }}
            </td>
            <td v-if="isColumnSelected('checkFechaAccionObjetivo')">
              {{
                formatFecha(
                  resultado.fechaDiaAccionObjetivo,
                  resultado.fechaMesAccionObjetivo,
                  resultado.fechaAñoAccionObjetivo
                )
              }}
            </td>
            <td v-if="isColumnSelected('checkFechaAccionRealizada')">
              {{
                formatFecha(
                  resultado.fechaDiaAccion,
                  resultado.fechaMesAccion,
                  resultado.fechaAñoAccion
                )
              }}
            </td>
            <td v-if="isColumnSelected('checkHoraAccion')">
              {{ formatHora(resultado.horaAccion, resultado.minutoAccion) }}
            </td>
            <td v-if="isColumnSelected('checkCompletada')">
              {{ resultado.completada }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
  
<script>
import { obtenerDatosGuardados } from "../../utilities/util.js";
import axios from "axios";

export default {
  components: {},
  data() {
    return {
      usuarios: [],
      query: "",
      parametrosQuery: [],
      selectedOrder: "fecha_desc", // Valor predeterminado: Fecha creación (más nuevo a más antiguo)
      fechaDesde: null,
      fechaHasta: null,
      accion: "todas",
      completada: "todas",
      resultados: [],
      opcionEmitidoORecibido: "todas",
    };
  },
  computed: {
  },
  created() {
    this.comprobarCorreo();
  },
  methods: {
    formatFecha(dia, mes, año) {
      // Verificar si todos los valores son nulos o inválidos
      if (dia === null || mes === null || año === null || isNaN(dia) || isNaN(mes) || isNaN(año)) {
        return ''; // Devolver una cadena vacía en caso de valores nulos o inválidos
      }

      // Continuar con el formateo de la fecha si los valores son válidos
      const fecha = new Date(año, mes - 1, dia);
      return fecha.toLocaleDateString("es-ES");
    },
    formatHora(hora, minuto) {
      // Asegurarse de que la hora y el minuto estén dentro de los rangos válidos
      hora = Math.max(0, Math.min(23, hora));
      minuto = Math.max(0, Math.min(59, minuto));

      // Agregar un cero inicial si el minuto es menor que 10
      if (minuto < 10) {
        minuto = "0" + minuto;
      }

      // Devolver la hora formateada como cadena en el formato "hora:minuto"
      return hora + ":" + minuto;
    },

    //FUnción que comprueba si el correo es nulo, en ese caso, nos devuelve a la página de login.
    async comprobarCorreo() {
      const correo = this.$store.state.correo;
      if (correo === null) {
        this.$router.push({ name: "LoginView" }); // Redireccionar a la página LoginView.vue
      }
    },
    // Verifica si una columna está seleccionada
    isColumnSelected(columnId) {
      try {
        const checkbox = document.getElementById(columnId);
        return checkbox.checked;
      } catch (error) {
        return true;
      }
    },
    //OBtener el Id de la persona que está usando el programa
    getMiId() {
      // Recupera la cadena de texto del almacenamiento local
      const objetoSerializado = localStorage.getItem("id");

      // Convierte la cadena de texto nuevamente a un objeto utilizando JSON.parse()
      const miId = JSON.parse(objetoSerializado);

      return miId;
    },
    //Ejecutar la consulta y mostrar los resultados en la tabla
    // Ejecutar la consulta y mostrar los resultados en la tabla
    async ejecutarConsulta() {
      try {
        //Obtener los parámetros
        const txtIdAccion = document.getElementById("txtIdAccion").value.trim();
        const txtIdOportunidad = document
          .getElementById("txtIdOportunidad")
          .value.trim();
        const txtProducto = document
          .getElementById("txtProductoOportunidad")
          .value.trim();
        const txtEmpresa = document
          .getElementById("txtEmpresaOportunidad")
          .value.trim();
        let txtAutor = "";
        if (this.$store.state.esAdmin) {
          txtAutor = document.getElementById("txtAutorAccion").value.trim();
        }
        let txtComercialAsignado = obtenerDatosGuardados("usuario");
        if (this.$store.state.esAdmin) {
          txtComercialAsignado = document.getElementById("txtComercialAsignado").value.trim();
        }

        const accionEscogida = this.accion;
        const txtAsunto = document
          .getElementById("txtAsuntoAccionOportunidad")
          .value.trim();
        const txtNotas = document
          .getElementById("txtNotasAccionOportunidad")
          .value.trim();
        const txtRi = document
          .getElementById("txtRiAccionOportunidad")
          .value.trim();
        const completadaEscogida = this.completada;// Obtiene los valores de los filtros directamente desde el estado del Vuex
        const fechaDesde = this.fechaDesde;
        const fechaHasta = this.fechaHasta;
        const opcionEmitidoORecibido = this.opcionEmitidoORecibido;
        const selectedOrder = this.selectedOrder;

        const response = await axios.post("/getListaAccionesOportunidades", {
          // Enviar los parámetros al servidor
          fechaDesde,
          fechaHasta,
          txtIdAccion,
          txtIdOportunidad,
          txtProducto,
          txtEmpresa,
          txtAutor,
          txtComercialAsignado,
          accionEscogida,
          opcionEmitidoORecibido,
          txtAsunto,
          txtNotas,
          txtRi,
          completadaEscogida,
          selectedOrder,
        });

        const { message } = response.data;
        this.usuarios = JSON.parse(message);
        this.resultados = JSON.parse(response.data.message); // Asignar resultados
      } catch (error) {
        console.error(error);
        this.message = "Error al obtener los usuarios";
      }
    },
    //Exportar tabla actual a CSV para descargar
    exportarCSV() {
      // Crea un arreglo de filas que contendrá los datos de la tabla
      const filas = [];

      // Agrega la fila de encabezados
      const encabezados = this.obtenerEncabezadosSeleccionados();
      filas.push(encabezados);

      // Agrega las filas de datos
      this.usuarios.forEach((usuario) => {
        const datosFila = this.obtenerDatosFila(usuario);
        filas.push(datosFila);
      });

      // Crea un objeto CSV utilizando el arreglo de filas
      let contenidoCSV = "";
      filas.forEach((fila) => {
        contenidoCSV += fila.map((dato) => `"${dato}"`).join(",") + "\n";
      });

      // Crea un objeto Blob con los datos CSV
      const blob = new Blob([contenidoCSV], {
        type: "text/csv;charset=utf-8;",
      });

      // Crea un objeto URL para el blob
      const url = window.URL.createObjectURL(blob);

      // Crea un elemento <a> para descargar el archivo y simula un clic en él
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "tabla.csv");
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Libera el objeto URL
      window.URL.revokeObjectURL(url);
    },
    //Obtener los encabezados seleccionados
    obtenerEncabezadosSeleccionados() {
      const encabezados = [];

      if (this.isColumnSelected("checkIdAccion")) {
        encabezados.push("ID");
      }
      if (this.isColumnSelected("checkIdOportunidad")) {
        encabezados.push("ID Oportunidad");
      }
      if (this.isColumnSelected("checkProductoOportunidad")) {
        encabezados.push("Producto");
      }
      if (this.isColumnSelected("checkEmpresaOportunidad")) {
        encabezados.push("Empresa");
      }
      if (this.isColumnSelected("checkIdAutorAccion")) {
        encabezados.push("ID Autor");
      }
      if (this.isColumnSelected("checkAutorAccion")) {
        encabezados.push("Autor");
      }
      if (this.isColumnSelected("checkComercialAsignado")) {
        encabezados.push("Comercial Asignado");
      }
      if (this.isColumnSelected("checkAccionObjetivo")) {
        encabezados.push("Acción");
      }
      if (this.isColumnSelected("checkAccionRealizada")) {
        encabezados.push("Acción realiazada");
      }
      if (this.isColumnSelected("checkEmitidoORecibidoAccionOportunidad")) {
        encabezados.push("Emitido o Recibido");
      }
      if (this.isColumnSelected("checkAsuntoAccionOportunidadObjetivo")) {
        encabezados.push("Asunto objetivo");
      }
      if (this.isColumnSelected("checkAsuntoAccionOportunidadRealizada")) {
        encabezados.push("Asunto realizada");
      }
      if (this.isColumnSelected("checkNotasAccionOportunidadObjetivo")) {
        encabezados.push("Notas objetivo");
      }
      if (this.isColumnSelected("checkNotasAccionOportunidadRealizada")) {
        encabezados.push("Notas realizada");
      }
      if (this.isColumnSelected("checkRiAccionOportunidad")) {
        encabezados.push("RI");
      }
      if (this.isColumnSelected("checkFechaOportunidad")) {
        encabezados.push(" Fecha Creación Oportunidad ");
      }
      if (this.isColumnSelected("checkFechaAccionObjetivo")) {
        encabezados.push(" Fecha acciónn objetivo ");
      }
      if (this.isColumnSelected("checkFechaAccionRealizada")) {
        encabezados.push("Fecha acción");
      }
      if (this.isColumnSelected("checkHoraAccion")) {
        encabezados.push("Hora acción");
      }
      if (this.isColumnSelected("checkCompletada")) {
        encabezados.push("Completada");
      }

      return encabezados;
    },
    obtenerDatosFila(usuario) {
      const datosFila = [];

      if (this.isColumnSelected("checkIdAccion")) {
        datosFila.push(usuario.idAccion);
      }
      if (this.isColumnSelected("checkIdOportunidad")) {
        datosFila.push(usuario.idOportunidad);
      }
      if (this.isColumnSelected("checkProductoOportunidad")) {
        datosFila.push(usuario.productoOportunidad);
      }
      if (this.isColumnSelected("checkEmpresaOportunidad")) {
        datosFila.push(usuario.empresaOportunidad);
      }
      if (this.isColumnSelected("checkIdAutorAccion")) {
        datosFila.push(usuario.idAutor);
      }
      if (this.isColumnSelected("checkAutorAccion")) {
        datosFila.push(usuario.AutorAccion);
      }
      if (this.isColumnSelected("checkComercialAsignado")) {
        datosFila.push(usuario.comercialAsignado);
      }
      if (this.isColumnSelected("checkAccionObjetivo")) {
        datosFila.push(usuario.accionObjetivo);
      }
      if (this.isColumnSelected("checkAccionRealizada")) {
        datosFila.push(usuario.accion);
      }
      if (this.isColumnSelected("checkEmitidoORecibidoAccionOportunidad")) {
        datosFila.push(usuario.emitidoORecibidoAccion);
      }
      if (this.isColumnSelected("checkAsuntoAccionOportunidadObjetivo")) {
        datosFila.push(usuario.asuntoAccionObjetivo);
      }
      if (this.isColumnSelected("checkAsuntoAccionOportunidadRealizada")) {
        datosFila.push(usuario.asuntoAccion);
      }
      if (this.isColumnSelected("checkNotasAccionOportunidadObjetivo")) {
        datosFila.push(usuario.notasAccionObjetivo);
      }
      if (this.isColumnSelected("checkNotasAccionOportunidadRealizado")) {
        datosFila.push(usuario.notasAccion);
      }
      if (this.isColumnSelected("checkRiAccionOportunidad")) {
        datosFila.push(usuario.riAccion);
      }
      if (this.isColumnSelected("checkFechaOportunidad")) {
        const fechaOportunidad = this.formatFecha(
          usuario.fechaDiaOportunidad,
          usuario.fechaMesOportunidad,
          usuario.fechaAñoOportunidad
        );
        datosFila.push(fechaOportunidad);
      }

      if (this.isColumnSelected("checkFechaAccionObjetivo")) {
        const fechaOportunidad = this.formatFecha(
          usuario.fechaDiaAccionObjetivo,
          usuario.fechaMesAccionObjetivo,
          usuario.fechaAñoAccionObjetivo
        );
        datosFila.push(fechaOportunidad);
      }

      if (this.isColumnSelected("checkFechaAccionRealizada")) {
        const fechaAccion = this.formatFecha(
          usuario.fechaDiaAccion,
          usuario.fechaMesAccion,
          usuario.fechaAñoAccion
        );
        datosFila.push(fechaAccion);
      }
      if (this.isColumnSelected("checkHoraAccion")) {
        // Si tienes los valores de hora y minuto en tu objeto de resultado, puedes formatear la hora aquí
        const hora = usuario.horaAccion;
        const minuto = usuario.minutoAccion;
        const horaFormateada = this.formatHora(hora, minuto);
        datosFila.push(horaFormateada);
      }
      if (this.isColumnSelected("checkCompletada")) {
        datosFila.push(usuario.completada);
      }

      return datosFila;
    },
  },
};
</script>
  
<style scoped>
.checkbox-container {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.checkbox-container label {
  margin-right: 10px;
}

.botonExportar {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
}

.botonExportar:hover {
  background-color: #45a049;
}

.botonExportar:active {
  background-color: #3e8e41;
}

.add-button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
}

.add-button:hover {
  background-color: #379f75;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #f1f5f8;
}

.custom-table th,
.custom-table td {
  padding: 10px;
  text-align: center;
  border: 1px solid #ccc;
}

.custom-table th {
  background-color: #4285f4;
  color: white;
}

.custom-table tbody tr:nth-child(even) {
  background-color: #eaf2fd;
}

.custom-table tbody tr:hover {
  background-color: #d1e3f8;
}

.accion-button {
  background-color: #ff9800;
  color: white;
  border: none;
  padding: 5px 10px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
}

.accion-button:hover {
  background-color: #e69138;
}
</style>
  