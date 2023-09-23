<template>
  <div>
    <!-- Agrega contenido específico de TareasPendientes.vue si es necesario -->
    <h1>Tareas Pendientes</h1>
    <br>
    <br>
    <!-- Utiliza el componente "calendarioAgenda" -->
    <calendarioAgenda />
  </div>
</template>

<script>
// Importa el componente "calendarioAgenda"
import calendarioAgenda from "@/components/calendarioAgenda.vue";

export default {
  components: {
    // Registra el componente "calendarioAgenda" en esta página
    calendarioAgenda,
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

<style>
/* Agrega estilos específicos de la página TareasPendientes.vue si es necesario */
</style>
