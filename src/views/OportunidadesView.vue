<template>
  <div>
    <h1>{{ pageTitle }}</h1>
    <hr>
    <fieldset name="fieldset_mostrar_columnas">
      <h4 style="color: blue">
        Mostrar columnas
      </h4>
      <br>
      <!-- Primera fila de checkboxes -->
      <div class="checkbox-container">
        <label>
          <input
            id="checkId"
            type="checkbox"
            name="checkId"
            checked
          >
          Id
        </label>

        <label>
          <input
            id="checkProducto"
            type="checkbox"
            name="checkProducto"
            checked
          >
          Producto
        </label>

        <label>
          <input
            id="checkEmpresa"
            type="checkbox"
            name="checkEmpresa"
            checked
          >
          Empresa
        </label>

        <label>
          <input
            id="checkPoblacion"
            type="checkbox"
            name="checkPoblacion"
            checked
          >
          Población
        </label>

        <label>
          <input
            id="checkNombre"
            type="checkbox"
            name="checkNombre"
            checked
          >
          Nombre
        </label>

        <label>
          <input
            id="checkApellido1"
            type="checkbox"
            name="checkApellido1"
            checked
          >
          Apellido1
        </label>

        <label>
          <input
            id="checkApellido2"
            type="checkbox"
            name="checkApellido2"
            checked
          >
          Apellido2
        </label>
      </div>

      <!-- Segunda fila de checkboxes -->
      <div class="checkbox-container">
        <label>
          <input
            id="checkTelefono1"
            type="checkbox"
            name="checkTelefono1"
            checked
          >
          Teléfono1
        </label>

        <label>
          <input
            id="checkTelefono2"
            type="checkbox"
            name="checkTelefono2"
            checked
          >
          Teléfono2
        </label>

        <label>
          <input
            id="checkCorreo1"
            type="checkbox"
            name="checkCorreo1"
            checked
          >
          Correo1
        </label>

        <label>
          <input
            id="checkCorreo2"
            type="checkbox"
            name="checkCorreo2"
            checked
          >
          Correo2
        </label>

        <label>
          <input
            id="checkComercial"
            type="checkbox"
            name="checkComercial"
            checked
          >
          Comercial Asignado
        </label>

        <label>
          <input
            id="checkAceptadaPorAdministradorstrador"
            type="checkbox"
            name="checkAceptadaPorAdministradorstrador"
            checked
          >
          Aceptada por administrador
        </label>

        <label>
          <input
            id="checkFechaCreacion"
            type="checkbox"
            name="checkFechaCreacion"
            checked
          >
          Fecha creación
        </label>
      </div>
    </fieldset>

    <fieldset name="fieldset_filtros">
      <h4>Filtros</h4>
      <input
        id="txtProducto"
        type="text"
        placeholder="Producto"
      >
      <input
        id="txtEmpresa"
        type="text"
        placeholder="Empresa"
      >
      <input
        id="txtPoblacion"
        type="text"
        placeholder="Población"
      >
      <input
        id="txtNombre"
        type="text"
        placeholder="Nombre"
      >
      <input
        id="txtApellido1"
        type="text"
        placeholder="Apellido1"
      >
      <input
        id="txtApellido2"
        type="text"
        placeholder="Apellido2"
      >
      <input
        id="txtTelefono1"
        type="text"
        placeholder="Teléfono1"
      >
      <input
        id="txtTelefono2"
        type="text"
        placeholder="Teléfono2"
      >
      <input
        id="txtCorreo1"
        type="text"
        placeholder="Correo1"
      >
      <input
        id="txtCorreo2"
        type="text"
        placeholder="Correo2"
      >
      <input
        v-if="$store.state.esAdmin"
        id="txtComercial"
        type="text"
        placeholder="Comercial Asignado"
      >
      <label for="selectAceptadaPorAdministrador">Aceptada por administrador</label>
      <select
        id="selectAceptadaPorAdministrador"
        v-model="aceptadaPorAdministradorOpcion"
        name="selectAceptadaPorAdministrador"
      >
        <option
          value="todas"
          selected
        >
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
        <label for="txtFechaDesde">Fecha Desde:</label>
        <input
          id="txtFechaDesde"
          v-model="fechaDesde"
          type="date"
        >
      </div>
      <div>
        <label for="txtFechaHasta">Fecha Hasta:</label>
        <input
          id="txtFechaHasta"
          v-model="fechaHasta"
          type="date"
        >
      </div>
      <hr>
      <label for="orderSelect">Ordenar por </label>
      <select
        id="orderSelect"
        v-model="selectedOrder"
      >
        <option value="fecha_desc">
          Fecha creación (más nuevo a más antiguo)
        </option>
        <option value="fecha_asc">
          Fecha creación (más antiguo a más nuevo)
        </option>
        <option
          v-if="$store.state.esAdmin"
          value="comercial_asignado"
        >
          Comercial asignado
        </option>
        <option value="aceptadaPorAdministradorstrador">
          Aceptada por administrador
        </option>
      </select>
      <button
        id="btn_ejecutar_consulta"
        @click="ejecutarConsulta"
      >
        Ejecutar consulta
      </button>
      <button
        class="botonExportar"
        @click="exportarCSV"
      >
        Exportar tabla a CSV
      </button>
    </fieldset>
    <hr>
    <button
      class="add-button"
      @click="toggleSidebar"
    >
      Agregar oportunidad de venta
    </button>
    <transition name="slide">
      <sideBarAñadir
        v-if="showSidebar"
        @cancel="toggleSidebar"
        @click.stop
      />
    </transition>
    <transition name="slide">
      <sideBarAgregarAccionOportunidadVenta
        v-if="showSideBarAgregarAccionUsuario"
        @cancel="agregarAccion(usuario)"
        @click.stop
      />
    </transition>

    <table class="custom-table">
      <thead>
        <tr>
          <th v-if="isColumnSelected('checkAccion')">
            Acción
          </th>
          <th v-if="isColumnSelected('checkId')">
            ID
          </th>
          <th v-if="isColumnSelected('checkProducto')">
            Producto
          </th>
          <th v-if="isColumnSelected('checkEmpresa')">
            Empresa
          </th>
          <th v-if="isColumnSelected('checkPoblacion')">
            Población
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
          <th v-if="isColumnSelected('checkComercial')">
            Comercial Asignado
          </th>
          <th v-if="isColumnSelected('checkAceptadaPorAdministradorstrador')">
            Aceptada por Administrador
          </th>
          <th v-if="isColumnSelected('checkFechaCreacion')">
            Fecha Creación
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="usuario in usuarios"
          :key="usuario.id"
        >
          <td v-if="isColumnSelected('checkAccion')">
            <button
              v-if="mostrarBotonAgregarAccion(usuario)"
              class="accion-button"
              @click="agregarAccion(usuario)"
            >
              Agregar acción
            </button>
          </td>

          <td v-if="isColumnSelected('checkId')">
            {{ usuario.idOportunidad }}
          </td>
          <td v-if="isColumnSelected('checkProducto')">
            {{ usuario.productoOportunidad }}
          </td>
          <td v-if="isColumnSelected('checkEmpresa')">
            {{ usuario.empresaOportunidad }}
          </td>
          <td v-if="isColumnSelected('checkPoblacion')">
            {{ usuario.poblacionOportunidad }}
          </td>
          <td v-if="isColumnSelected('checkNombre')">
            {{ usuario.nombreOportunidad }}
          </td>
          <td v-if="isColumnSelected('checkApellido1')">
            {{ usuario.apellido1Oportunidad }}
          </td>
          <td v-if="isColumnSelected('checkApellido2')">
            {{ usuario.apellido2Oportunidad }}
          </td>
          <td v-if="isColumnSelected('checkTelefono1')">
            {{ usuario.telefono1Oportunidad }}
          </td>
          <td v-if="isColumnSelected('checkTelefono2')">
            {{ usuario.telefono2Oportunidad }}
          </td>
          <td v-if="isColumnSelected('checkCorreo1')">
            {{ usuario.correo1Oportunidad }}
          </td>
          <td v-if="isColumnSelected('checkCorreo2')">
            {{ usuario.correo2Oportunidad }}
          </td>
          <td v-if="isColumnSelected('checkComercial')">
            {{ usuario.correoUsuarios }}
          </td>
          <td v-if="isColumnSelected('checkAceptadaPorAdministradorstrador')">
            {{ usuario.aceptadaPorAdministradorOportunidad }}
          </td>
          <td v-if="isColumnSelected('checkFechaCreacion')">
            {{
              formatFecha(
                usuario.fechaDiaCreacionOportunidad,
                usuario.fechaMesCreacionOportunidad,
                usuario.fechaAñoCreacionOportunidad
              )
            }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import sideBarAñadir from "../components/sideBaAñadirOportunidadVenta.vue";
import sideBarAgregarAccionOportunidadVenta from "../components/sideBarAgregarAccionOportunidadVenta.vue";
export default {
  components: {
    sideBarAñadir,
    sideBarAgregarAccionOportunidadVenta,
  },
  data() {
    return {
      usuarios: [],
      showSidebar: false,
      showSideBarAgregarAccionUsuario: false,
      query: "",
      parametrosQuery: [],
      selectedOrder: "fecha_desc", // Valor predeterminado: Fecha creación (más nuevo a más antiguo)
      fechaDesde: null,
      fechaHasta: null,
      accion_sobre: "null",
      accionTexto: "Empresa", // Agrega esta línea
      aceptadaPorAdministradorOpcion: "todas",
    };
  },
  computed: {
    pageTitle() {
      return `Oportunidades de Venta actuales`;
    },
  },
  created() {
    this.comprobarCorreo();
    //this.main();
    // Inicia la actualización periódica cada 5 segundos
    //setInterval(this.ejecutarConsulta, 5000);
  },
  methods: {
    toggleSidebar() {
      this.showSidebar = !this.showSidebar;
    },
    formatFecha(dia, mes, año) {
      const fecha = new Date(año, mes - 1, dia);
      return fecha.toLocaleDateString("es-ES");
    },
    //Obtener los encabezados seleccionados
    obtenerEncabezadosSeleccionados() {
      const encabezados = [];

      if (this.isColumnSelected("checkId")) {
        encabezados.push("ID");
      }
      if (this.isColumnSelected("checkProducto")) {
        encabezados.push("Producto");
      }
      if (this.isColumnSelected("checkEmpresa")) {
        encabezados.push("Empresa");
      }
      if (this.isColumnSelected("checkPoblacion")) {
        encabezados.push("Población");
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
      if (this.isColumnSelected("checkComercial")) {
        encabezados.push("Comercial Asignado");
      }
      if (this.isColumnSelected("checkAceptadaPorAdministradorstrador")) {
        encabezados.push("Aceptada por Administrador");
      }
      if (this.isColumnSelected("checkFechaCreacion")) {
        encabezados.push("Fecha Creación");
      }

      // if (this.isColumnSelected("checkAccion")) {
      // encabezados.push("Acción");
      //}

      return encabezados;
    },
    obtenerDatosFila(usuario) {
      const datosFila = [];

      if (this.isColumnSelected("checkId")) {
        datosFila.push(usuario.id);
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
        datosFila.push(usuario.nombreOportunidad);
      }
      if (this.isColumnSelected("checkApellido1")) {
        datosFila.push(usuario.apellido1Oportunidad);
      }
      if (this.isColumnSelected("checkApellido2")) {
        datosFila.push(usuario.apellido2Oportunidad);
      }
      if (this.isColumnSelected("checkTelefono1")) {
        datosFila.push(usuario.telefono1Oportunidad);
      }
      if (this.isColumnSelected("checkTelefono2")) {
        datosFila.push(usuario.telefono2Oportunidad);
      }
      if (this.isColumnSelected("checkCorreo1")) {
        datosFila.push(usuario.correo1Oportunidad);
      }
      if (this.isColumnSelected("checkCorreo2")) {
        datosFila.push(usuario.correo2Oportunidad);
      }
      if (this.isColumnSelected("checkComercial")) {
        datosFila.push(usuario.correoUsuarios);
      }
      if (this.isColumnSelected("checkAceptadaPorAdministradorstrador")) {
        datosFila.push(usuario.aceptadaPorAdministradorOportunidad);
      }
      if (this.isColumnSelected("checkFechaCreacion")) {
        const fechaCreacion = this.formatFecha(
          usuario.fechaDiaCreacionOportunidad,
          usuario.fechaMesCreacionOportunidad,
          usuario.fechaAñoCreacionOportunidad
        );
        datosFila.push(fechaCreacion);
      }

      

      //if (this.isColumnSelected("checkAccion")) {
      //datosFila.push(""); // Dejar el espacio en blanco para la columna de acción
      //}

      return datosFila;
    },
    agregarAccion(usuario) {
      // Convierte el objeto a una cadena de texto utilizando JSON.stringify()
      const OportunidadVentaSerializado = JSON.stringify(usuario);


      // Guarda la cadena de texto en el almacenamiento local
      localStorage.setItem("oportunidadVentaSeleccionada", OportunidadVentaSerializado);

      this.showSideBarAgregarAccionUsuario =
        !this.showSideBarAgregarAccionUsuario;
    },
    mostrarBotonAgregarAccion(usuario) {
      if (this.$store.state.esAdmin) {
        return true;
      }
      return usuario.aceptadaPorAdministradorOportunidad === 1;
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
      let contenidoCSV = '';
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
    async ejecutarConsulta() {
      try {
        // Obtener los filtros del cliente
        const filtros = {
          fechaDesde: this.fechaDesde,
          fechaHasta: this.fechaHasta,
          txtProducto: document.getElementById("txtProducto").value.trim(),
          txtEmpresa: document.getElementById("txtEmpresa").value.trim(),
          txtPoblacion: document.getElementById("txtPoblacion").value.trim(),
          txtNombre: document.getElementById("txtNombre").value.trim(),
          txtApellido1: document.getElementById("txtApellido1").value.trim(),
          txtApellido2: document.getElementById("txtApellido2").value.trim(),
          txtTelefono1: document.getElementById("txtTelefono1").value.trim(),
          txtTelefono2: document.getElementById("txtTelefono2").value.trim(),
          txtCorreo1: document.getElementById("txtCorreo1").value.trim(),
          txtCorreo2: document.getElementById("txtCorreo2").value.trim(),
          txtComercial: this.$store.state.esAdmin
            ? document.getElementById("txtComercial").value.trim()
            : this.$store.state.correo,
          aceptadaPorAdministradorOpcion: this.aceptadaPorAdministradorOpcion,
          selectedOrder: document.getElementById("orderSelect").value,
        };

        // Realizar la petición POST al servidor con los filtros
        const response = await axios.post("/getOportunidades", filtros);

        const { message } = response.data;
        this.usuarios = JSON.parse(message);
      } catch (error) {
        console.error(error);
        this.message = "Error al obtener las oportunidades";
      }
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
