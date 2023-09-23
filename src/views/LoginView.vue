
<template>
  <div class="login-container">
    <h1>EurekaCRM</h1>
    <form @submit.prevent="login" class="login-form">
      <div class="form-group">
        <label for="username">Correo:</label>
        <input id="username" type="text" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input id="password" type="password" v-model="password" required />
      </div>
      <button type="submit" class="login-button">Iniciar sesión</button>
    </form>
    <div id="Registrarse">
      <router-link to="SingUpView">¿No tienes una cuenta? Registrarse</router-link>
    </div>
    <p class="login-message">{{ message }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
      message: "",
      showPassword: false,
    };
  },
  methods: {
    async darPermisos() {
      try {
        const response = await axios.post("/esAdmin", { correo: this.username });
        const { esAdmin } = response.data;
        if (esAdmin) {
          // Guardar el tipo de usuario en el estado de la aplicación
          this.$store.commit("setEsAdmin", true);
        }
      } catch (error) {
        console.error(error);
        this.message = "Error al obtener los usuarios";
      }
    },
    async guardarId() {
      try {
        const response = await axios.post("/getIdFromCorreo", { correo: this.username });
        const { message } = response.data;
        const id = message;

        // Convierte el objeto a una cadena de texto utilizando JSON.stringify()
        const objetoSerializado = JSON.stringify(id);
        // Guarda la cadena de texto en el almacenamiento local
        localStorage.setItem("id", objetoSerializado);

      } catch (error) {
        console.error(error);
        this.message = "Error al obtener los usuarios";
      }
    },
    async guardarCorreo() {
      try {

        // Convierte el objeto a una cadena de texto utilizando JSON.stringify()
        const objetoSerializado = JSON.stringify(this.username);
        // Guarda la cadena de texto en el almacenamiento local
        localStorage.setItem("usuario", objetoSerializado);

      } catch (error) {
        console.error(error);
        this.message = "Error al obtener los usuarios";
      }
    }
    ,
    login() {
      axios
        .post("/login", {
          correo: this.username,
          contraseña: this.password,
        })
        .then((response) => {
          const { message, token } = response.data;
          this.message = message;
          if (message === "OK") {
            console.log("Sesión iniciada");

            // Guardar el correo en el estado de la aplicación
            this.$store.commit("setCorreo", this.username);

            //Guardar el id de mi usuario
            this.guardarId();

            //Guardar el correo de mi usuario
            this.guardarCorreo();

            this.darPermisos();

            // Redirigir al usuario a la página HomeView.vue
            this.$router.push({ name: "HomeView" });
          }

          // Aquí puedes guardar el token en localStorage o en una cookie
          // y realizar otras acciones relacionadas con la sesión
          console.log(token);
        })
        .catch((error) => {
          console.error(error);
          console.log(error);
          this.message = "Error al iniciar sesión";
        });
    },
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>

<style>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 8px;
  background-color: #f4f4f4;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.form-group {
  margin-bottom: 10px;
}

label {
  font-weight: bold;
}

input {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  padding: 8px 16px;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}

.login-message {
  margin-top: 10px;
}

.password-input {
  position: relative;
}

.password-input input {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.password-input button {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
}

.form-group {
  display: flex;
  align-items: center;
}

.form-group label {
  margin-right: 10px;
}
</style>
