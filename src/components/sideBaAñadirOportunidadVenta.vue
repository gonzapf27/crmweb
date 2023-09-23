<template>
  <div class="sidebar">
    <h2>Agregar Oportunidad de Venta</h2>
    <form @submit.prevent="submitForm">
      <div class="form-row">
        <div class="form-group">
          <label for="producto">Producto*</label>
          <input type="text" id="producto" v-model="formulario.producto" required>
        </div>
        <div class="form-group">
          <label for="empresa">Empresa*</label>
          <input type="text" id="empresa" v-model="formulario.empresa" required>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="poblacion">Población</label>
          <input type="text" id="poblacion" v-model="formulario.poblacion">
        </div>
        <div class="form-group">
          <label for="nombre">Nombre</label>
          <input type="text" id="nombre" v-model="formulario.nombre">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="apellido1">Apellido 1</label>
          <input type="text" id="apellido1" v-model="formulario.apellido1">
        </div>
        <div class="form-group">
          <label for="apellido2">Apellido 2</label>
          <input type="text" id="apellido2" v-model="formulario.apellido2">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="telefono1">Teléfono 1*</label>
          <input type="tel" id="telefono1" v-model="formulario.telefono1" required>
        </div>
        <div class="form-group">
          <label for="telefono2">Teléfono 2</label>
          <input type="tel" id="telefono2" v-model="formulario.telefono2">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="correo1">Correo 1*</label>
          <input type="email" id="correo1" v-model="formulario.correo1" required>
        </div>
        <div class="form-group">
          <label for="correo2">Correo 2</label>
          <input type="email" id="correo2" v-model="formulario.correo2">
        </div>
      </div>
      <div class="form-buttons">
        <button type="submit" class="submit-button">Añadir</button>
        <span class="button-separator"></span>
        <button type="button" class="cancel-button" @click="cancelForm">Cancelar</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      formulario: {
        producto: '',
        empresa: '',
        poblacion: '',
        nombre: '',
        apellido1: '',
        apellido2: '',
        telefono1: '',
        telefono2: '',
        correo1: '',
        correo2: '',
      },
      mostrarFormulario: true,
    };
  },
  methods: {
    //OBtener el Id de la persona que está usando el programa
    getMiId() {
      // Recupera la cadena de texto del almacenamiento local
      const objetoSerializado = localStorage.getItem("id");

      // Convierte la cadena de texto nuevamente a un objeto utilizando JSON.parse()
      const miId = JSON.parse(objetoSerializado);

      return miId;
    },
    async comprobarSiEstaEnListaNegra() {
      try {
        const parametros = {
          empresa: this.formulario.empresa,
          correo1: this.formulario.correo1,
          correo2: this.formulario.correo2,
          telefono1: this.formulario.telefono1,
          telefono2: this.formulario.telefono2
        };
        const response = await axios.post("/estaEnListaNegra", parametros);
        const { numeroOcurrencias } = response.data;

        if (numeroOcurrencias > 0) {
          const confirmacion = window.confirm(
            "Esta empresa tiene datos pertenecientes a nuestra Lista negra!\n¿Quieres añadir la oportunidad de venta igualmente?"
          );
          // Si se hace clic en "Aceptar" (Sí), se devuelve true. Si se hace clic en "Cancelar" (No), se devuelve false.
          return !confirmacion;
        }

      } catch (error) {
        console.error('Error al comprobar si está en lista negra:', error);
        alert("Ha ocurrido un error al comprobar si está en lista negra");
        return true;
      }
    },

    async submitForm() {
      //Primero comprobamos si está en la lista negra antes de insertar
      if (await this.comprobarSiEstaEnListaNegra()) {
        return;
      }
      const fechaActual = new Date();
      const fechaDiaCreacion = fechaActual.getDate();
      const fechaMesCreacion = fechaActual.getMonth() + 1;
      const fechaAñoCreacion = fechaActual.getFullYear();

      const parametros = {
        producto: this.formulario.producto,
        empresa: this.formulario.empresa,
        poblacion: this.formulario.poblacion,
        nombre: this.formulario.nombre,
        apellido1: this.formulario.apellido1,
        apellido2: this.formulario.apellido2,
        telefono1: this.formulario.telefono1,
        telefono2: this.formulario.telefono2,
        correo1: this.formulario.correo1,
        correo2: this.formulario.correo2,
        idComercialAsignado: this.getMiId(),
        aceptadaPorAdministrador: 0,
        fechaDiaCreacion: fechaDiaCreacion,
        fechaMesCreacion: fechaMesCreacion,
        fechaAñoCreacion: fechaAñoCreacion,
        visible: 1
      };

      try {
        const response = await axios.post("/anadirOportunidadVenta", parametros);
        const { message } = response.data;
        console.log(message);
        alert("Oportunidad de venta añadida correctamente");
        this.formulario = {
          producto: '',
          empresa: '',
          poblacion: '',
          nombre: '',
          apellido1: '',
          apellido2: '',
          telefono1: '',
          telefono2: '',
          correo1: '',
          correo2: '',
        };
        this.$emit("cancel");
      } catch (error) {
        console.error('Error al añadir la oportunidad:', error);
        alert("Ha ocurrido un error al añadir la oportunidad");
      }
    },
    cancelForm() {
      // Limpiar el formulario
      this.formulario = {
        producto: '',
        empresa: '',
        poblacion: '',
        nombre: '',
        apellido1: '',
        apellido2: '',
        telefono1: '',
        telefono2: '',
        correo1: '',
        correo2: '',
      };
      // Ocultar el formulario
      this.$emit("cancel");
    },
  },
};
</script>



  
<style scoped>
.button-separator {
  display: inline-block;
  width: 10px;
}

.cancel-button {
  background-color: red;
}

.sidebar {
  width: 20%;
  height: 100vh;
  background-color: #f1f5f8;
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px;
  box-sizing: border-box;
}
</style>





  