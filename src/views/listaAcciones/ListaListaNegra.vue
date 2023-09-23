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
            <input
              id="checkIdListaNegra"
              type="checkbox"
              name="checkIdListaNegra"
              checked
            >
            Id
          </label>

          <label>
            <input
              id="checkIdOportunidad"
              type="checkbox"
              name="checkIdOportunidad"
            >
            ID Oportunidad
          </label>

          <label>
            <input
              id="checkProductoOportunidad"
              type="checkbox"
              name="checkProductoOportunidad"
              checked
            >
            Producto
          </label>

          <label>
            <input
              id="checkEmpresaOportunidad"
              type="checkbox"
              name="checkEmpresaOportunidad"
              checked
            >
            Empresa
          </label>

          <label>
            <input
              id="checkIdCreador"
              type="checkbox"
              name="checkIdCreador"
            >
            ID Creador
          </label>

          <label>
            <input
              id="checkCreador"
              type="checkbox"
              name="checkCreador"
              checked
            >
            Creador
          </label>

          
          <label>
            <input
              id="checkMotivo"
              type="checkbox"
              name="checkMotivo"
              checked
            >
            Motivo
          </label>


          <label>
            <input
              id="checkComercialAsignado"
              type="checkbox"
              name="checkComercialAsignado"
              checked
            >
            Comercial asignado
          </label>
        </div>

        <!-- Segunda fila de checkboxes -->
        <div class="checkbox-container">
          <label>
            <input
              id="checkFechaOportunidad"
              type="checkbox"
              name="checkFechaOportunidad"
              checked
            >
            Fecha creación Oportunidad
          </label>

          <label>
            <input
              id="checkFechaListaNegra"
              type="checkbox"
              name="checkFechaListaNegra"
              checked
            >
            Fecha trapaso a lista negra
          </label>
        </div>
      </fieldset>
      <fieldset name="fieldSetFiltrosOportunidad">
        <h4 style="color: blue">
          Filtros
        </h4>
        <input
          id="txtIdListaNegra"
          type="text"
          placeholder="ID Lista negra"
        >
        <input
          id="txtIdOportunidad"
          type="text"
          placeholder="ID Oportunidad"
        >
        <input
          id="txtProductoOportunidad"
          type="text"
          placeholder="Producto"
        >
        <input
          id="txtEmpresaOportunidad"
          type="text"
          placeholder="Empresa"
        >
        <input
          id="txtCreador"
          type="text"
          placeholder="Creador"
        >
        <input
          id="txtMotivo"
          type="text"
          placeholder="Motivo"
        >
        <input
          id="txtComercialAsignado"
          type="text"
          placeholder="Comercial asignado"
        >
        <hr>
        <div>
          <label for="txtFechaDesdeAccionOportunidad">Fecha traspaso Desde:</label>
          <input
            id="txtFechaDesdeAccionOportunidad"
            v-model="fechaDesde"
            type="date"
          >
        </div>
        <div>
          <label for="txtFechaHastaAccionOportunidad">Fecha traspaso Hasta:</label>
          <input
            id="txtFechaHastaAccionOportunidad"
            v-model="fechaHasta"
            type="date"
          >
        </div>
        <hr>
        <label for="order-select">Ordenar por </label>
        <select
          id="order-select"
          v-model="selectedOrder"
        >
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
          <option value="creador">
            Creador
          </option>
          <option value="motivo">
            Motivo
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
    </div>
    <!--Tabla de resultados de acciones de oportunidades de venta-->
    <div>
      <table class="custom-table">
        <thead>
          <tr>
            <th v-if="isColumnSelected('checkIdListaNegra')">
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
            <th v-if="isColumnSelected('checkIdCreador')">
              ID Creador
            </th>
            <th v-if="isColumnSelected('checkCreador')">
              Creador
            </th>
            <th v-if="isColumnSelected('checkMotivo')">
              Motivo
            </th>
            <th v-if="isColumnSelected('checkComercialAsignado')">
              Comercial asignado
            </th>








            <th v-if="isColumnSelected('checkFechaOportunidad')">
              Fecha Creación Oportunidad
            </th>
            <th v-if="isColumnSelected('checkFechaListaNegra')">
              Fecha trapaso a Lista negra
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="resultado in resultados"
            :key="resultado.id"
          >
            <td v-if="isColumnSelected('checkIdListaNegra')">
              {{ resultado.id }}
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
            <td v-if="isColumnSelected('checkIdCreador')">
              {{ resultado.idCreador }}
            </td>
            <td v-if="isColumnSelected('checkCreador')">
              {{ resultado.creador }}
            </td>
            <td v-if="isColumnSelected('checkMotivo')">
              {{ resultado.motivo }}
            </td>
            <td v-if="isColumnSelected('checkComercialAsignado')">
              {{ resultado.comercialAsignado }}
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

            <td v-if="isColumnSelected('checkFechaListaNegra')">
              {{
                formatFecha(
                  resultado.fechaDiaCreacion,
                  resultado.fechaMesCreacion,
                  resultado.fechaAñoCreacion
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
            resultados: [],
        };
    },
    computed: {
    },
    created() {
        this.comprobarCorreo();
    },
    methods: {
        formatFecha(dia, mes, año) {
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
                const txtIdListaNegra = document.getElementById("txtIdListaNegra").value.trim();
                const txtIdOportunidad = document
                    .getElementById("txtIdOportunidad")
                    .value.trim();
                const txtProducto = document
                    .getElementById("txtProductoOportunidad")
                    .value.trim();
                const txtEmpresa = document
                    .getElementById("txtEmpresaOportunidad")
                    .value.trim();

                let txtCreador = document.getElementById("txtCreador").value.trim();
                let txtComercialAsignado = document.getElementById("txtComercialAsignado").value.trim();
                let txtMotivo = document.getElementById("txtMotivo").value.trim();

                const fechaDesde = this.fechaDesde;
                const fechaHasta = this.fechaHasta;

                const selectedOrder = this.selectedOrder;

                const response = await axios.post("https://eurekacrm-server.onrender.com/getListaNegra", {
                    // Enviar los parámetros al servidor
                    fechaDesde: fechaDesde,
                    fechaHasta: fechaHasta,
                    idListaNegra: txtIdListaNegra,
                    idOportunidad: txtIdOportunidad, 
                    producto: txtProducto,
                    empresa: txtEmpresa,
                    creador: txtCreador,
                    comercialAsignado: txtComercialAsignado,
                    orden: selectedOrder,
                    motivo: txtMotivo
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

            if (this.isColumnSelected("checkIdListaNegra")) {
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
            if (this.isColumnSelected("checkIdCreador")) {
                encabezados.push("ID Creador");
            }
            if (this.isColumnSelected("checkCreador")) {
                encabezados.push("Creador");
            }
            if (this.isColumnSelected("checkCreador")) {
                encabezados.push("Motivo");
            }
            if (this.isColumnSelected("checkComercialAsignado")) {
                encabezados.push("Comercial Asignado");
            }
            if (this.isColumnSelected("checkFechaOportunidad")) {
                encabezados.push(" Fecha Creación Oportunidad ");
            }
            if (this.isColumnSelected("checkFechaListaNegra")) {
                encabezados.push(" Fecha traspaso a lista negra ");
            }



            return encabezados;
        },
        obtenerDatosFila(usuario) {
            const datosFila = [];

            if (this.isColumnSelected("checkIdListaNegra")) {
                datosFila.push(usuario.id);
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
            if (this.isColumnSelected("checkIdCreador")) {
                datosFila.push(usuario.idCreador);
            }
            if (this.isColumnSelected("checkCreador")) {
                datosFila.push(usuario.creador);
            }
            if (this.isColumnSelected("checkCreador")) {
                datosFila.push(usuario.motivo);
            }
            if (this.isColumnSelected("checkComercialAsignado")) {
                datosFila.push(usuario.comercialAsignado);
            }
            if (this.isColumnSelected("checkFechaOportunidad")) {
                const fechaOportunidad = this.formatFecha(
                    usuario.fechaDiaOportunidad,
                    usuario.fechaMesOportunidad,
                    usuario.fechaAñoOportunidad
                );
                datosFila.push(fechaOportunidad);
            }
            if (this.isColumnSelected("checkFechaListaNegra")) {
                const fechaCreacionListaNegra = this.formatFecha(
                    usuario.fechaDiaCreacion,
                    usuario.fechaMesCreacion,
                    usuario.fechaAñoCreacion
                );
                datosFila.push(fechaCreacionListaNegra);
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
  