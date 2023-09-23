<template>
  <div class="tabs">
    <ul>
      <li :class="{ 'active': activeTab === 'oportunidades' }" @click="selectTab('oportunidades')">
        <router-link to="/OportunidadesView">
          Oportunidades de venta
        </router-link>
      </li>
      <li :class="{ 'active': activeTab === 'acciones' }" @click="selectTab('acciones')">
        <router-link to="/ListaAccionesView">
          Acciones
        </router-link>
      </li>
      <li :class="{
        'active': activeTab === 'tareas',
        'has-tareas-pendientes': tareasPendientes > 0,
        'no-tareas-pendientes': tareasPendientes === 0
      }" @click="selectTab('tareas')">
        <router-link to="/tareasPendientesView">
          <span :style="{ color: textColor }">
            Tareas Pendientes ({{ tareasPendientes }})
          </span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      activeTab: 'oportunidades',
      tareasPendientes: 0,
    };
  },
  computed: {
    textColor() {
      return this.tareasPendientes > 0 ? 'red' : 'green';
    },
  },
  created() {
    this.updateTareasPendientes();
    setInterval(this.updateTareasPendientes, 10000);
  },
  methods: {
    selectTab(tab) {
      this.activeTab = tab;
    },
    getMiId() {
      // Recupera la cadena de texto del almacenamiento local
      const objetoSerializado = localStorage.getItem("id");

      // Convierte la cadena de texto nuevamente a un objeto utilizando JSON.parse()
      const miId = JSON.parse(objetoSerializado);

      return miId;
    },
    async getTareasPendientes() {
      try {
        const id = this.getMiId();
        const data = {
        id
      };
        const responseAccion = await axios.post("https://eurekacrm-server.onrender.com/getNTareasPendientesFromId", data);
        const { message } = responseAccion.data;
        return message;
      } catch (error) {
        console.error("Error al obtener eventos:", error);
        return 9999;
      }
    },
    async updateTareasPendientes() {
      this.tareasPendientes = await this.getTareasPendientes();
    },
  },
};
</script>

<style>
/* Estilos para la barra de pestañas */
.tabs {
  display: flex;
  justify-content: center;
  background-color: #f0f0f0;
  padding: 10px;
}

.tabs ul {
  list-style: none;
  display: flex;
  padding: 0;
}

.tabs ul li {
  cursor: pointer;
  padding: 10px 20px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
  transition: background-color 0.3s ease;
  color: green;
}

.tabs ul li:hover {
  background-color: #e0e0e0;
}

.tabs ul li.active {
  background-color: #ddd;
}

.tabs ul li.has-tareas-pendientes {
  color: red;
}

.tabs ul li.no-tareas-pendientes {
  color: green;
}
</style>
