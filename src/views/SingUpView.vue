<template>
  <div class="login-container">
    <h1>EurekaCRM</h1>
    <form @submit.prevent="register" class="login-form">
      <div class="form-group">
        <label for="correo">Correo:</label>
        <input id="correo" type="text" v-model="correo" required />
      </div>
      <div class="form-group">
        <label for="contraseña">Contraseña:</label>
        <input id="contraseña" type="password" v-model="contraseña" required />
      </div>
      <button type="submit" class="login-button">Registrarse</button>
    </form>
    <div id="Registrarse">
      <router-link to="LoginView"
        >¿Ya tienes una cuenta? Iniciar sesión</router-link
      >
    </div>
    <p class="login-message">{{ message }}</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      correo: "",
      contraseña: "",
      message: "",
      showPassword: false,
    };
  },
  methods: {
    register() {
      axios
        .post("/singUp", {
          correo: this.correo,
          contraseña: this.contraseña,
          fechaCreacionDia: this.fechaCreacionDia,
          fechaCreacionMes: this.fechaCreacionMes,
          fechaCreacionAño: this.fechaCreacionAño,
        })
        .then((response) => {
          const { message, token } = response.data;
          this.message = message;

          // Aquí puedes guardar el token en localStorage o en una cookie
          // y redirigir al usuario a otra página
          console.log(token);
        })
        .catch((error) => {
          console.error(error);
          this.message = "Error al registrarse.";
        });
    },
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },
    updateFechaNacimiento() {
      //Actualizar fecha de nacimiento
      const fecha = new Date(this.fechaNacimiento);
      this.fechaNacimientoDia = fecha.getDate().toString().padStart(2, "0");
      this.fechaNacimientoMes = (fecha.getMonth() + 1)
        .toString()
        .padStart(2, "0");
      this.fechaNacimientoAño = fecha.getFullYear().toString();
      //Actualizar fecha de creación
      const fechaActual = new Date();
      this.fechaCreacionDia = fechaActual.getDate().toString().padStart(2, "0");
      this.fechaCreacionMes = (fechaActual.getMonth() + 1)
        .toString()
        .padStart(2, "0");
      this.fechaCreacionAño = fechaActual.getFullYear().toString();
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
