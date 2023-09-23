<template>
  <div class="page">
    <h1>{{ pageTitle }}</h1>
    <router-view />
  </div>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
      activeTab: 'oportunidades',
      tareasPendientes: 0, // Initialize the value
    };
  },
  computed: {
    pageTitle() {
      // Obtén el valor del correo desde el estado de la aplicación
      const correo = this.$store.state.correo;

      // Personaliza el título según tus necesidades
      return `Bienvenido, ${correo}!`;
    },
  },
  created() {
    // Actualizar el número de tareas pendientes cada minuto (60000 milisegundos)
    this.updateTareasPendientes();
    setInterval(this.updateTareasPendientes, 60000);
  },
  methods: {
    selectTab(tab) {
      this.activeTab = tab;
    },
    getTareasPendientes() {
      // Simulamos obtener el número de tareas pendientes (puedes cambiar esto según tus necesidades)
      return 11;
    },
    updateTareasPendientes() {
      this.tareasPendientes = this.getTareasPendientes();
    },
  },
};
</script>


<style scoped>
.page {
  text-align: center;
  padding: 5px;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.banner {
  max-width: 100%;
  margin-bottom: 10px;
}

.tabs {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tabs ul {
  list-style: none;
  display: flex;
  justify-content: center;
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
  /* Agregamos estilos para el texto de la pestaña */
  color: green;
  /* Por defecto, en verde */
}

.tabs ul li:hover {
  background-color: #e0e0e0;
}

.tabs ul li.active {
  background-color: #ddd;
}

/* Estilos para cuando hay tareas pendientes */
.tabs ul li.has-tareas-pendientes {
  color: red;
}

.tab-content {
  margin-top: 20px;
  background-color: #f0f0f0;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
