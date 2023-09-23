<template>
  <div id="app">
    <TabsNavigation v-if="$store.state.correo !== null" /> <!-- Aquí se muestra el componente Tabs.vue -->
    <img
      v-if="$store.state.correo !== null"
      src="./assets/eureka_logo.png"
      alt="Eureka Logo"
      class="banner"
    >
    <h2 v-if="$store.state.correo !== null" >{{ pageTitle }} </h2>
    <hr>

    <router-view />
  </div>
</template>

<script>
import TabsNavigation from './components/tabsNavigation.vue';

export default {
  components: { TabsNavigation },
  computed: {
    pageTitle() {
      // Obtén el valor del correo desde el estado de la aplicación
      const correo = this.$store.state.correo;

      // Personaliza el título según tus necesidades
      return `Bienvenido, ${correo}!`;
    },
  },
  created() {
    // Verifica si el correo está almacenado en localStorage o en una cookie y establece el estado de la aplicación correspondientemente
    const correo = localStorage.getItem("correo");
    if (correo) {
      this.$store.commit("setCorreo", correo);
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
