<template>
  <div>
    <hr>
    <hr>
    <!--Sección para las oportunidades de venta-->
    <div>
      <fieldset name="fieldsetMostrarColumnasOportunidades">
        <h4 style="color: blue">
          Mostrar columnas clientes
        </h4>
        <br>
        <!-- Primera fila de checkboxes -->
        <div class="checkbox-container">
          <label>
            <input id="checkIdCliente" type="checkbox" name="checkIdCliente" checked>
            Id
          </label>

          <label>
            <input id="checkProducto" type="checkbox" name="checkProducto">
            Producto
          </label>

          <label>
            <input id="checkEmpresa" type="checkbox" name="checkEmpresa" checked>
            Empresa
          </label>

          <label>
            <input id="checkPoblacion" type="checkbox" name="checkPoblacion" checked>
            Poblacion
          </label>

          <label>
            <input id="checkNombre" type="checkbox" name="checkNombre">
            Nombre
          </label>

          <label>
            <input id="checkApellido1" type="checkbox" name="checkApellido1" checked>
            Apellido1
          </label>


          <label>
            <input id="checkApellido2" type="checkbox" name="checkApellido2" checked>
            Apellido2
          </label>

          <label>
            <input id="checkTelefono1" type="checkbox" name="checkTelefono1">
            Teléfono 1
          </label>

          <label>
            <input id="checkTelefono2" type="checkbox" name="checkTelefono2" checked>
            Teléfono 2
          </label>
        </div>

        <!-- Segunda fila de checkboxes -->
        <div class="checkbox-container">
          <label>
            <input id="checkCorreo1" type="checkbox" name="checkCorreo1" checked>
            Correo1
          </label>

          <label>
            <input id="checkCorreo2" type="checkbox" name="checkCorreo2">
            Correo2
          </label>

          <label>
            <input id="checkIdComercialAsignado" type="checkbox" name="checkIdComercialAsignado" checked>
            ID Comercial Asignado
          </label>

          <label>
            <input id="checkComercialAsignado" type="checkbox" name="checkComercialAsignado">
            Comercial asignado
          </label>

          <label>
            <input id="checkFechaCreacionCliente" type="checkbox" name="checkFechaCreacionCliente" checked>
            Fecha creación cliente
          </label>
        </div>
      </fieldset>
      <fieldset name="fieldSetFiltrosOportunidad">
        <h4 style="color: blue">
          Filtros
        </h4>
        <input id="txtIdCliente" type="text" placeholder="ID cliente">
        <input id="txtProductoCliente" type="text" placeholder="Producto">
        <input id="txtEmpresaCliente" type="text" placeholder="Empresa">
        <input id="txtPoblacionCliente" type="text" placeholder="Poblacion">
        <input id="txtNombreCliente" type="text" placeholder="Nombre">
        <input id="txtApellido1" type="text" placeholder="Apellido1">
        <input id="txtApellido2" type="text" placeholder="Apellido2">
        <input id="txtTelefono1" type="text" placeholder="Teléfono1">
        <input id="txtTelefono2" type="text" placeholder="Teléfono2">
        <input id="txtCorreo1" type="text" placeholder="Correo1">
        <input id="txtCorreo2" type="text" placeholder="Correo2">
        <input v-if="$store.state.esAdmin" id="txtComercialAsignado" type="text" placeholder="Comercial asignado">
        <hr>
        <div>
          <label for="txtFechaDesdeCliente">Fecha Desde:</label>
          <input id="txtFechaDesdeCliente" v-model="fechaDesde" type="date">
        </div>
        <div>
          <label for="txtFechaHastaCliente">Fecha Hasta:</label>
          <input id="txtFechaHastaCliente" v-model="fechaHasta" type="date">
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
            <th v-if="isColumnSelected('checkIdCliente')">
              ID
            </th>
            <th v-if="isColumnSelected('checkProducto')">
              Producto
            </th>
            <th v-if="isColumnSelected('checkEmpresa')">
              Empresa
            </th>
            <th v-if="isColumnSelected('checkPoblacion')">
              Poblacion
            </th>
            <th v-if="isColumnSelected('checkNombre')">
              Nombre
            </th>
            <th v-if="isColumnSelected('checkApellido1')">
              Apellido1
            </th>
            <th v-if="isColumnSelected('checkApellido2')">
              Apellido2
            </th>
            <th v-if="isColumnSelected('checkTelefono1')">
              Teléfono1
            </th>
            <th v-if="isColumnSelected('checkTelefono2')">
              Teléfono2
            </th>
            <th v-if="isColumnSelected('checkCorreo1')">
              Correo1
            </th>
            <th v-if="isColumnSelected('checkCorreo2')">
              Correo2
            </th>
            <th v-if="isColumnSelected('checkIdComercialAsignado')">
              ID Comercial asignado
            </th>
            <th v-if="isColumnSelected('checkComercialAsignado')">
              Comercial asignado
            </th>
            <th v-if="isColumnSelected('checkFechaCreacionCliente')">
              Fecha Creación Cliente
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="resultado in resultados" :key="resultado.idAccion">
            <td v-if="isColumnSelected('checkIdCliente')">
              {{ resultado.idCliente }}
            </td>
            <td v-if="isColumnSelected('checkProducto')">
              {{ resultado.productoOportunidad }}
            </td>
            <td v-if="isColumnSelected('checkEmpresa')">
              {{ resultado.empresaOportunidad }}
            </td>
            <td v-if="isColumnSelected('checkPoblacion')">
              {{ resultado.poblacionOportunidad }}
            </td>
            <td v-if="isColumnSelected('checkNombre')">
              {{ resultado.nombreCliente }}
            </td>
            <td v-if="isColumnSelected('checkApellido1')">
              {{ resultado.apellido1Cliente }}
            </td>
            <td v-if="isColumnSelected('checkApellido2')">
              {{ resultado.apellido2Cliente }}
            </td>
            <td v-if="isColumnSelected('checkTelefono1')">
              {{ resultado.telefono1Cliente }}
            </td>
            <td v-if="isColumnSelected('checkTelefono2')">
              {{ resultado.telefono2Cliente }}
            </td>
            <td v-if="isColumnSelected('checkCorreo1')">
              {{ resultado.correo1Cliente }}
            </td>
            <td v-if="isColumnSelected('checkCorreo2')">
              {{ resultado.correo2Cliente }}
            </td>
            <td v-if="isColumnSelected('checkIdComercialAsignado')">
              {{ resultado.idComercialAsignado }}
            </td>
            <td v-if="isColumnSelected('checkComercialAsignado')">
              {{ resultado.correoComercial }}
            </td>
            <td v-if="isColumnSelected('checkFechaCreacionCliente')">
              {{
                formatFecha(
                  resultado.fechaDiaCreacionCliente,
                  resultado.fechaMesCreacionCliente,
                  resultado.fechaAñoCreacionCliente
                )
              }}
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
      if (isNaN(dia) || isNaN(mes) || isNaN(año)) {
        return "Fecha inválida";
      }

      const fecha = new Date(año, mes - 1, dia);

      if (isNaN(fecha.getTime())) {
        return "Fecha inválida";
      }

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
    //Función que comprueba si el correo es nulo, en ese caso, nos devuelve a la página de login.
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
        const txtIdCliente = document.getElementById("txtIdCliente").value.trim();
        const txtProducto = document
          .getElementById("txtProductoCliente")
          .value.trim();
        const txtEmpresa = document
          .getElementById("txtEmpresaCliente")
          .value.trim();
        const txtPoblacion = document
          .getElementById("txtPoblacionCliente")
          .value.trim();
        const txtNombre = document
          .getElementById("txtNombreCliente")
          .value.trim();
        const txtApellido1 = document
          .getElementById("txtApellido1")
          .value.trim();
        const txtApellido2 = document
          .getElementById("txtApellido2")
          .value.trim();
        const txtTelefono1 = document
          .getElementById("txtTelefono1")
          .value.trim();
        const txtTelefono2 = document
          .getElementById("txtTelefono2")
          .value.trim();
        const txtCorreo1 = document
          .getElementById("txtCorreo1")
          .value.trim();
        const txtCorreo2 = document
          .getElementById("txtCorreo2")
          .value.trim();

        let txtComercialAsignado = obtenerDatosGuardados("usuario");
        if (this.$store.state.esAdmin) {
          txtComercialAsignado = document.getElementById("txtComercialAsignado").value.trim();
        }


        const fechaDesde = this.fechaDesde;
        const fechaHasta = this.fechaHasta;
        const selectedOrder = this.selectedOrder;


        const response = await axios.post("https://eurekacrm-server.onrender.com/getListaClientes", {
          // Enviar los parámetros al servidor
          txtIdCliente,
          txtProducto,
          txtEmpresa,
          txtPoblacion,
          txtNombre,
          txtApellido1,
          txtApellido2,
          txtTelefono1,
          txtTelefono2,
          txtCorreo1,
          txtCorreo2,
          txtComercialAsignado,
          fechaDesde,
          fechaHasta,
          selectedOrder
        });

        const { message } = response.data;
        this.usuarios = JSON.parse(message);
        //alert(message);
        this.resultados = JSON.parse(response.data.message); // Asignar resultados

      } catch (error) {
        console.error(error);
        this.message = "Error al obtener los clientes";
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

      if (this.isColumnSelected("checkIdCliente")) {
        encabezados.push("ID");
      }
      if (this.isColumnSelected("checkProducto")) {
        encabezados.push("Producto");
      }
      if (this.isColumnSelected("checkEmpresa")) {
        encabezados.push("Empresa");
      }
      if (this.isColumnSelected("checkPoblacion")) {
        encabezados.push("Poblacion");
      }
      if (this.isColumnSelected("checkNombre")) {
        encabezados.push("Nombre");
      }
      if (this.isColumnSelected("checkApellido1")) {
        encabezados.push("Apellido1");
      }
      if (this.isColumnSelected("checkApellido2")) {
        encabezados.push("Apellido2");
      }
      if (this.isColumnSelected("checkTelefono1")) {
        encabezados.push("Teléfono1");
      }
      if (this.isColumnSelected("checkTelefono2")) {
        encabezados.push("Teléfono2");
      }
      if (this.isColumnSelected("checkCorreo1")) {
        encabezados.push("Correo1");
      }
      if (this.isColumnSelected("checkCorreo2")) {
        encabezados.push("Correo2");
      }
      if (this.isColumnSelected("checkIdComercialAsignado")) {
        encabezados.push("ID comercial asignado");
      }
      if (this.isColumnSelected("checkComercialAsignado")) {
        encabezados.push("Comercial asignado");
      }
      if (this.isColumnSelected("checkFechaCreacionCliente")) {
        encabezados.push(" Fecha creación cliente ");
      }
      return encabezados;
    },
    obtenerDatosFila(usuario) {
      const datosFila = [];

      if (this.isColumnSelected("checkIdCliente")) {
        datosFila.push(usuario.idCliente);
      }
      if (this.isColumnSelected("checkProducto")) {
        datosFila.push(usuario.productoOportunidad);
      }
      if (this.isColumnSelected("checkEmpresa")) {
        datosFila.push(usuario.empresaOportunidad);
      }
      if (this.isColumnSelected("checkPoblacion")) {
        datosFila.push(usuario.poblacionOportunidad);
      }
      if (this.isColumnSelected("checkNombre")) {
        datosFila.push(usuario.nombreCliente);
      }
      if (this.isColumnSelected("checkApellido1")) {
        datosFila.push(usuario.apellido1Cliente);
      }
      if (this.isColumnSelected("checkApellido2")) {
        datosFila.push(usuario.apellido2Cliente);
      }
      if (this.isColumnSelected("checkTelefono1")) {
        datosFila.push(usuario.telefono1Cliente);
      }
      if (this.isColumnSelected("checkTelefono2")) {
        datosFila.push(usuario.telefono2Cliente);
      }
      if (this.isColumnSelected("checkCorreo1")) {
        datosFila.push(usuario.correo1Cliente);
      }
      if (this.isColumnSelected("checkCorreo2")) {
        datosFila.push(usuario.correo2Cliente);
      }
      if (this.isColumnSelected("checkIdComercialAsignado")) {
        datosFila.push(usuario.idComercialAsignado);
      }
      if (this.isColumnSelected("checkComercialAsignado")) {
        datosFila.push(usuario.correoComercial);
      }
      if (this.isColumnSelected("checkFechaCreacionCliente")) {
        const fechaOportunidad = this.formatFecha(
          usuario.fechaDiaCreacionCliente,
          usuario.fechaMesCreacionCliente,
          usuario.fechaAñoCreacionCliente
        );
        datosFila.push(fechaOportunidad);
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
  