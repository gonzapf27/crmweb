<template>
  <div>
    <h1>{{ pageTitle }}</h1>
    <hr>
    <label for="selectTablaAcciones">Filtros para</label>
    <select id="selectTablaAcciones" v-model="selectTablaAcciones" name="selectTablaAcciones">
      <option value="oportunidades">
        Acciones sobre oportunidades de venta
      </option>
      <option value="clientes">
        Clientes
      </option>
      <option value="contactos">
        Contactos
      </option>
      <option value="listaNegra">
        Lista negra
      </option>
    </select>
    <hr>
    <!--Mostrar cada página en función de la opción escogida-->
    <div v-if="selectTablaAcciones === 'oportunidades'">
       <!-- Aquí mostraremos el componente "listaAccionesOportunidades.vue" -->
       <lista-acciones-oportunidades></lista-acciones-oportunidades>
    </div>
    <div v-if="selectTablaAcciones === 'listaNegra'">
       <!-- Aquí mostraremos el componente "listaAccionesOportunidades.vue" -->
       <lista-negra></lista-negra>
    </div>
    <div v-if="selectTablaAcciones === 'clientes'">
       <!-- Aquí mostraremos el componente "listaAccionesOportunidades.vue" -->
       <lista-clientes></lista-clientes>
    </div>
  </div>
</template>

<script>
import ListaAccionesOportunidades from './listaAcciones/ListaAccionesOportunidades.vue';
import ListaListaNegra from './listaAcciones/ListaListaNegra.vue';
import ListaClientes from './listaAcciones/ListaClientes.vue';
export default {
  components: {
        // Registramos el componente para poder usarlo
        'lista-acciones-oportunidades': ListaAccionesOportunidades,
        'lista-negra': ListaListaNegra,
        'lista-clientes': ListaClientes,
  },
  data() {
    return {
      selectTablaAcciones: "",
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
    //FUnción que comprueba si el correo es nulo, en ese caso, nos devuelve a la página de login.
    async comprobarCorreo() {
      const correo = this.$store.state.correo;
      if (correo === null) {
        this.$router.push({ name: "LoginView" }); // Redireccionar a la página LoginView.vue
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
