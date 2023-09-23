<template>
  <div class="sidebar">
    <h2>Agregar acción sobre {{ getEmpresa() }}</h2>
    <form @submit.prevent="submitForm">
      <div class="form-row">
        <label for="accion-select">Acción*</label>
        <select id="accion-select" v-model="accionSeleccionada" required>
          <option value="llamada">
            Llamada telefónica
          </option>
          <option value="correo">
            Correo electrónico
          </option>
          <option value="whatsapp">
            WhatsApp
          </option>
          <option value="visita">
            Visita
          </option>
          <option value="presupuesto">
            Presupuesto terminado
          </option>
          <option value="venta">
            Venta realizada
          </option>
          <option value="contacto">
            Pasar a contacto
          </option>
          <option value="aceptarDenegar" v-if="$store.state.esAdmin">
            Aceptar / Denegar
          </option>
          <option value="otro">
            Otro
          </option>
          <option value="listaNegra">
            Enviar a lista negra
          </option>
        </select>
      </div>

      <div v-if="mostrarEmitirRecibir()" class="form-row">
        <label for="emitir-recibir">Autor de la acción*</label>
        <div class="radio-buttons">
          <input id="emitido" v-model="emitidoORecibido" type="radio" name="opcion" value="emitido" required>
          <label for="emitido">Emitir</label>
          <span class="button-separator" />
          <input id="recibido" v-model="emitidoORecibido" type="radio" name="opcion" value="recibido" required>
          <label for="recibido">Recibir</label>
        </div>
      </div>


      <div v-if="mostrarAsunto()" id="parteAsunto" class="form-row">
        <div class="form-group">
          <label for="asunto">Asunto</label>
          <input id="asunto" v-model="formulario.asunto" type="text">
        </div>
      </div>

      <div v-if="mostrarNotasAdicionales()" id="parteNotasAdicionales" class="form-row">
        <div class="form-group">
          <label for="notas">Notas adicionales</label>
          <textarea id="notas" v-model="formulario.notas" rows="4" style="resize: both;" />
        </div>
      </div>

      <div v-if="mostrarFecha()" id="parteFecha" class="form-row">
        <div class="form-group">
          <label for="fecha">Fecha*:</label>
          <input id="fecha" v-model="formulario.fecha" type="date" required>
        </div>

        <div class="form-group">
          <label for="hora">Hora*:</label>
          <input id="hora" v-model="formulario.hora" type="time" required>
        </div>
      </div>

      <div v-if="mostrarRi()" class="form-row">
        <div class="form-group">
          <label for="ri">RI*:</label>
          <input id="ri" v-model="formulario.ri" type="number" placeholder="0" min="0">
        </div>
      </div>

      <div v-if="mostrarMotivoListaNegra()" id="parteListaNegra" class="form-row">
        <div class="form-group">
          <label for="motivoListaNegra">Motivo/Notas por el que se lleva a lista negra</label>
          <br /> <!-- Agregamos un salto de línea para separar el label del textarea -->
          <textarea id="motivoListaNegra" v-model="formulario.motivoListaNegra" rows="4" style="resize: both;" />
        </div>
      </div>

      <div v-if="mostrarBotonesAceptarCancelar()" id="parteBotonesAceptarCancelar" class="form-buttons">
        <button type="submit" class="submit-button" :class="{ 'agendar-button': esFechaSuperior }">
          {{ textoBoton
          }}
        </button> <span class="button-separator" />
        <button type="button" class="cancel-button" @click="cancelForm">
          Cancelar
        </button>
      </div>

      <div v-if="mostrarAceptarDenegar()" id="parteAceptarDenegar">
        <label for="">Asignar y aceptar</label>
        <br>
        <select v-if="accionSeleccionada === 'aceptarDenegar'" id="selectComercial" v-model="comercialAsignado"
          name="selectComercial">
          <option v-for="correo in listaCorreos" :key="correo" :value="correo">
            {{ correo }}
          </option>
        </select>
        <hr>
        <div id="parteBotonesAceptarDenegar" class="">
          <button id="btnAsignarComercial" type="button" @click="asignarAlComercial">Asignar al comercial</button>
          <span class="button-separator" />
          <button type="button" class="cancel-button" @click="cancelForm">
            Cancelar
          </button>
          <hr>
          <label for="">Denegar</label>
          <hr>
          <button id="btnAsignarComercial" type="button" @click="denegarATodosComerciales">Denegar al comercial
            asignado</button>
          <span class="button-separator" />
          <button type="button" class="cancel-button" @click="cancelForm">
            Cancelar
          </button>

        </div>
      </div>

      <div v-if="mostrarPasarAContacto()">
        <hr>
        <button id="btnPasarAContacto" type="button" @click="pasarAContacto">Pasar a contacto</button>
        <span class="button-separator" />
        <button type="button" class="cancel-button" @click="cancelForm">
          Cancelar
        </button>
        <hr>
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
        accionSeleccionada: '',
        emitidoORecibido: 'emitir',
        asunto: '',
        notas: '',
        fecha: '',
        hora: '',
        ri: 0,
        motivoListaNegra: '',
      },
      accionSeleccionada: 'llamada',
      emitidoORecibido: '',
      mostrarFormulario: true,
      listaCorreos: ['prueba'],
      comercialAsignado: '',
    };
  },
  computed: {
    esFechaSuperior() {
      // Comprueba si la fecha seleccionada es superior a la fecha actual teniendo en cuenta la hora
      const fechaSeleccionada = new Date(this.formulario.fecha);
      const fechaActual = new Date();

      // Establece la misma fecha en ambas fechas, pero con la hora y los minutos actuales en la fecha actual
      fechaSeleccionada.setHours(this.formulario.hora.split(':')[0], this.formulario.hora.split(':')[1], 0, 0);

      return fechaSeleccionada.getTime() > fechaActual.getTime();
    },
    textoBoton() {
      // Cambia el texto del botón según el resultado de la comparación
      return this.esFechaSuperior ? 'Agendar' : 'Añadir';
    }
  },
  created() {
    this.obtenerComerciales();
  },
  methods: {
    getEmpresa() {
      // Recupera la cadena de texto del almacenamiento local
      const objetoSerializado = localStorage.getItem("oportunidadVentaSeleccionada");

      // Convierte la cadena de texto nuevamente a un objeto utilizando JSON.parse()
      const miObjeto = JSON.parse(objetoSerializado);
      return miObjeto.empresaOportunidad;
    },
    getcorreo1() {
      // Recupera la cadena de texto del almacenamiento local
      const objetoSerializado = localStorage.getItem("oportunidadVentaSeleccionada");

      // Convierte la cadena de texto nuevamente a un objeto utilizando JSON.parse()
      const miObjeto = JSON.parse(objetoSerializado);
      return miObjeto.correo1Oportunidad;
    },
    getcorreo2() {
      // Recupera la cadena de texto del almacenamiento local
      const objetoSerializado = localStorage.getItem("oportunidadVentaSeleccionada");

      // Convierte la cadena de texto nuevamente a un objeto utilizando JSON.parse()
      const miObjeto = JSON.parse(objetoSerializado);
      return miObjeto.correo2Oportunidad;
    },
    getTelefono1() {
      // Recupera la cadena de texto del almacenamiento local
      const objetoSerializado = localStorage.getItem("oportunidadVentaSeleccionada");

      // Convierte la cadena de texto nuevamente a un objeto utilizando JSON.parse()
      const miObjeto = JSON.parse(objetoSerializado);
      return miObjeto.telefono1Oportunidad;
    },
    getTelefono2() {
      // Recupera la cadena de texto del almacenamiento local
      const objetoSerializado = localStorage.getItem("oportunidadVentaSeleccionada");

      // Convierte la cadena de texto nuevamente a un objeto utilizando JSON.parse()
      const miObjeto = JSON.parse(objetoSerializado);
      return miObjeto.telefono2Oportunidad;
    },
    getIdOportunidad() {
      // Recupera la cadena de texto del almacenamiento local
      const objetoSerializado = localStorage.getItem("oportunidadVentaSeleccionada");

      // Convierte la cadena de texto nuevamente a un objeto utilizando JSON.parse()
      const miObjeto = JSON.parse(objetoSerializado);
      return parseInt(miObjeto.idOportunidad);
    },
    mostrarEmitirRecibir() {
      const opciones = ["llamada", "correo", "whatsapp", "visita"];
      return opciones.includes(this.accionSeleccionada);
    },
    mostrarAsunto() {
      const opciones = ["llamada", "correo", "whatsapp", "visita", "otro"];
      return opciones.includes(this.accionSeleccionada);
    },
    mostrarNotasAdicionales() {
      const opciones = ["llamada", "correo", "whatsapp", "visita", "otro"];
      return opciones.includes(this.accionSeleccionada);
    },
    mostrarFecha() {
      const opciones = ["llamada", "correo", "whatsapp", "visita", "otro"];
      return opciones.includes(this.accionSeleccionada);
    },
    mostrarBotonesAceptarCancelar() {
      const opciones = ["llamada", "correo", "whatsapp", "visita", "presupuesto", "venta", "otro", "listaNegra"];
      return opciones.includes(this.accionSeleccionada);
    },
    mostrarRi() {
      const opciones = ["presupuesto", "venta"];
      return opciones.includes(this.accionSeleccionada);
    },
    mostrarMotivoListaNegra() {
      const opciones = ["listaNegra"];
      return opciones.includes(this.accionSeleccionada);
    },
    mostrarAceptarDenegar() {
      return this.accionSeleccionada === "aceptarDenegar";
    },
    mostrarPasarAContacto() {
      return this.accionSeleccionada === "contacto";
    },
    getMiId() {
      // Recupera la cadena de texto del almacenamiento local
      const objetoSerializado = localStorage.getItem("id");

      // Convierte la cadena de texto nuevamente a un objeto utilizando JSON.parse()
      const miId = JSON.parse(objetoSerializado);

      return miId;
    },
    async getIdDeCorreo(correo) {
      try {

        const response = await axios.post("https://eurekacrm-server.onrender.com/getIdFromCorreo", { correo: correo });
        const { message } = response.data;
        const id = message;
        return id;
      } catch (error) {
        console.error('Error al obtener el ID del correo:', error);
        alert("Ha ocurrido un error al obtener el ID del correo");
        return null;
      }
    },
    async comprobarSiEstaEnListaNegra() {
      try {
        const parametros = {
          empresa: this.getEmpresa(),
          correo1: this.getcorreo1(),
          correo2: this.getcorreo2(),
          telefono1: this.getTelefono1(),
          telefono2: this.getTelefono2()
        };
        const response = await axios.post("https://eurekacrm-server.onrender.com/estaEnListaNegra", parametros);
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
    //Función para asignar a un comercial, y crear la primera tarea automática
    async asignarAlComercial() {
      if (await this.comprobarSiEstaEnListaNegra()) {
        return;
      }
      if (this.comercialAsignado !== "") {
        const idCorreo = await this.getIdDeCorreo(this.comercialAsignado);
        const idOportunidad = await this.getIdOportunidad();

        const parametros = {
          idCorreo: idCorreo,
          idOportunidad: idOportunidad
        };

        try {
          const response = await axios.post("https://eurekacrm-server.onrender.com/asignarOportunidadAComercial", parametros);
          const { message } = response.data;
          console.log(message);
          //TODO: comprobar si la oportunidad ya está asignada a otra persona, en cuyo caso, no crear acciones automáticas nuevas,
          //si no que hay que cambiar el comercialAsignado al nuevo.
          alert("Oportunidad aceptada y asignada al comercial " + this.comercialAsignado);
          //Crear la primera tarea automática
          await this.agendarPrimeraAccionAutomatica();
          this.cancelForm();
        } catch (error) {
          console.error('Error al asignar la oportunidad al comercial:', error);
          alert("Ha ocurrido un error al asignar la oportunidad al comercial");
        }
      } else {
        alert("Por favor selecciona un comercial a quien asignarle la oportunidad de venta");
      }
    },

    //TODO: completar, por ahora no funciona
    // Función para pasar a contacto una oportunidad de venta
    async pasarAContacto() {
      const fechaActual = new Date();
      const fechaDiaCreacion = fechaActual.getDate();
      const fechaMesCreacion = fechaActual.getMonth() + 1; // Los meses empiezan desde 0, por lo que se suma 1
      const fechaAñoCreacion = fechaActual.getFullYear();

      const idOportunidad = await this.getIdOportunidad();

      const paramsAccion = {
        idOportunidad,
        fechaDiaCreacion,
        fechaMesCreacion,
        fechaAñoCreacion,
      };

      try {
        const responseAccion = await axios.post("https://eurekacrm-server.onrender.com/crearContacto", paramsAccion);

        if (responseAccion.data.confirmacion) {
          // Si hay duplicados, mostrar mensaje de confirmación al usuario
          const confirmacion = window.confirm(responseAccion.data.confirmacion);

          if (confirmacion) {
            // Si el usuario confirma, crear el contacto de todos modos
            const resultado = await axios.post("https://eurekacrm-server.onrender.com/crearContacto", paramsAccion);
            console.log(resultado.data.message);
          } else {
            console.log("Creación de contacto cancelada por el usuario.");
          }
        } else {
          // Si no hay duplicados, mostrar mensaje de éxito
          console.log(responseAccion.data.message);
        }
      } catch (error) {
        console.error('Error al crear el cliente:', error);
        alert("Ha ocurrido un error al crear el cliente");
      }
    }
    ,

    //Creación de la primera tarea automática
    async agendarPrimeraAccionAutomatica() {
      if (this.comercialAsignado !== "") {
        const idCorreo = await this.getIdDeCorreo(this.comercialAsignado);
        const idOportunidad = await this.getIdOportunidad();


        const parametros = {
          idCorreo: idCorreo,
          idOportunidad: idOportunidad
        };

        try {
          const response = await axios.post("https://eurekacrm-server.onrender.com/agendarAccionAutomatica1", parametros);
          const { message } = response.data;
          alert(message);
          this.cancelForm();
        } catch (error) {
          console.error('Error al asignar la oportunidad al comercial:', error);
          alert("Ha ocurrido un error al asignar la oportunidad al comercial");
        }
      } else {
        alert("Por favor selecciona un comercial a quien asignarle la oportunidad de venta");
      }
    },
    async denegarATodosComerciales() {
      const idOportunidad = await this.getIdOportunidad();

      const parametros = {
        idOportunidad: idOportunidad
      };

      try {
        const response = await axios.post("https://eurekacrm-server.onrender.com/denegarOportunidadATodos", parametros);
        const { message } = response.data;
        console.log(message);
        alert("Oportunidad denegada a todos los comerciales");
        this.cancelForm();
      } catch (error) {
        console.error('Error al denegar la oportunidad a todos los comerciales:', error);
        alert("Ha ocurrido un error al denegar la oportunidad a todos los comerciales");
      }
    },
    async obtenerComerciales() {
      try {
        const response = await axios.get("/obtenerComerciales");
        const { comerciales } = response.data;
        this.listaCorreos = comerciales;
      } catch (error) {
        console.error('Error al obtener los correos de los comerciales:', error);
        alert("Ha ocurrido un error al obtener los correos de los comerciales");
      }
    },
    async ocultarOportunidad(id) {
      try {
        const response = await axios.post("https://eurekacrm-server.onrender.com/ocultarOportunidad", { id });
        const { message } = response.data;
        console.log(message);
      } catch (error) {
        console.error('Error al ocultar la oportunidad:', error);
        alert("Ha ocurrido un error al ocultar la oportunidad");
      }
    },
    async crearCliente(idOportunidad) {
      const fechaActual = new Date();
      const fechaDiaCreacion = fechaActual.getDate();
      const fechaMesCreacion = fechaActual.getMonth() + 1; // Los meses empiezan desde 0, por lo que se suma 1
      const fechaAñoCreacion = fechaActual.getFullYear();

      const paramsAccion = {
        idOportunidad,
        fechaDiaCreacion,
        fechaMesCreacion,
        fechaAñoCreacion,
      };

      try {
        const responseAccion = await axios.post("https://eurekacrm-server.onrender.com/crearCliente", paramsAccion);
        const { message } = responseAccion.data;
        console.log(message);
      } catch (error) {
        console.error('Error al crear el cliente:', error);
        alert("Ha ocurrido un error al crear el cliente");
      }
    },
    async ejecutarVenta() {
      const idOportunidad = await this.getIdOportunidad();
      //Crear cliente en base a la oportunidad
      await this.crearCliente(idOportunidad);

      //Ocultar la oportunidad de la lista de clientes
      await this.ocultarOportunidad(idOportunidad);
    },
    async agendarAccion() {
      const fechaSeleccionada = new Date(this.formulario.fecha);
      const fechaDiaObjetivo = fechaSeleccionada.getDate();
      const fechaMesObjetivo = fechaSeleccionada.getMonth() + 1;
      const fechaAñoObjetivo = fechaSeleccionada.getFullYear();
      const [horaObjetivo, minutoObjetivo] = this.formulario.hora.split(':');

      const fechaCreacion = new Date();
      const fechaDiaCreacion = fechaCreacion.getDate();
      const fechaMesCreacion = fechaCreacion.getMonth() + 1;
      const fechaAñoCreacion = fechaCreacion.getFullYear();
      const [horaCreacion, minutoCreacion] = this.formulario.hora.split(':');

      let emitido = 0;
      if (this.emitidoORecibido === "recibido") {
        emitido = 1;
      }

      const data = {
        idOportunidad: await this.getIdOportunidad(),
        idCreador: this.getMiId(),
        accionObjetivo: this.accionSeleccionada,
        emitidoORecibidoObjetivo: emitido,
        asuntoObjetivo: this.formulario.asunto,
        notasObjetivo: this.formulario.notas,
        riObjetivo: this.formulario.ri,
        fechaDiaObjetivo,
        fechaMesObjetivo,
        fechaAñoObjetivo,
        horaObjetivo,
        minutoObjetivo,
        fechaDiaCreacion,
        fechaMesCreacion,
        fechaAñoCreacion,
        horaCreacion,
        minutoCreacion,
      };

      try {
        const responseAccion = await axios.post("https://eurekacrm-server.onrender.com/agendarAccion", data);
        const { message } = responseAccion.data;
        console.log(message);
        alert("Acción agendada correctamente");
      } catch (error) {
        console.error('Error al agendar la acción:', error);
        alert("Ha ocurrido un error al agendar la acción");
      }
    },

    async registrarAccion() {
      const fechaSeleccionada = new Date(this.formulario.fecha);
      const fechaDiaRealizada = fechaSeleccionada.getDate();
      const fechaMesRealizada = fechaSeleccionada.getMonth() + 1;
      const fechaAñoRealizada = fechaSeleccionada.getFullYear();
      const [horaRealizada, minutoRealizada] = this.formulario.hora.split(':');
      let emitido = 0;
      if (this.emitidoORecibido === "recibido") {
        emitido = 1;
      }

      const data = {
        idOportunidad: await this.getIdOportunidad(),
        idAutor: this.getMiId(),
        accionRealizada: this.accionSeleccionada,
        emitidoORecibidoRealizada: emitido,
        asuntoRealizada: this.formulario.asunto,
        notasRealizada: this.formulario.notas,
        riRealizada: this.formulario.ri,
        fechaDiaRealizada: fechaDiaRealizada,
        fechaMesRealizada: fechaMesRealizada,
        fechaAñoRealizada: fechaAñoRealizada,
        horaRealizada: horaRealizada,
        minutoRealizada: minutoRealizada,
      };

      try {
        const response = await axios.post("https://eurekacrm-server.onrender.com/registrarAccionOportunidad", data);
        const { message } = response.data;
        console.log(message);
        alert("Acción registrada correctamente");
      } catch (error) {
        console.error('Error al registrar la acción:', error);
        alert("Ha ocurrido un error al registrar la acción");
      }
    },
    async enviarAListaNegra() {
      const fechaActual = new Date();
      const fechaDiaActual = fechaActual.getDate();
      const fechaMesActual = fechaActual.getMonth() + 1;
      const fechaAñoActual = fechaActual.getFullYear();
      const [horaActual, minutoActual] = this.formulario.hora.split(':');
      let emitido = 0;
      if (this.emitidoORecibido === "recibido") {
        emitido = 1;
      }

      const idOportunidad = this.getIdOportunidad();
      const miId = this.getMiId();




      const data = {
        idOportunidad: idOportunidad,
        idAutor: miId,
        accionRealizada: this.accionSeleccionada,
        emitidoORecibidoRealizada: emitido,
        asuntoRealizada: this.formulario.asunto,
        notasRealizada: this.formulario.motivoListaNegra,
        riRealizada: this.formulario.ri,
        fechaDiaRealizada: fechaDiaActual,
        fechaMesRealizada: fechaMesActual,
        fechaAñoRealizada: fechaAñoActual,
        horaRealizada: horaActual,
        minutoRealizada: minutoActual,
      };

      //Registrar la acción
      try {
        const response = await axios.post("https://eurekacrm-server.onrender.com/registrarAccionOportunidad", data);
        const { message } = response.data;
        console.log(message);
        alert("Acción registrada correctamente");
      } catch (error) {
        console.error('Error al registrar la acción:', error);
        alert("Ha ocurrido un error al registrar la acción");
      }

      //Enviar la oportunidad a la lista negra
      const dataListaNegra = {
        idOportunidad: idOportunidad,
        idCreador: miId,
        motivo: this.formulario.motivoListaNegra,
        fechaDiaCreacion: fechaDiaActual,
        fechaMesCreacion: fechaMesActual,
        fechaAñoCreacion: fechaAñoActual
      };
      try {
        const responseListaNegra = await axios.post("https://eurekacrm-server.onrender.com/enviarAListaNegraFromIdOportunidad", dataListaNegra);
        const { message } = responseListaNegra.data;
        console.log(message);
        alert("Se ha enviado la oportunidad a la lista negra.");
      } catch (error) {
        console.error('Error al enviar a lista negra:', error);
        alert("Ha ocurrido un error al enviar la oportunidad a la lista negra");
      }
    },
    limpiarFormulario() {
      // Limpiar el formulario
      this.formulario = {
        accionSeleccionada: '',
        emitidoORecibido: '',
        asunto: '',
        notas: '',
        fecha: '',
        hora: '',
        ri: 0
      };
    },
    async submitForm() {
      //Antes de nada se comprueba si la acción es una acción realizada o una acción para el futuro
      if (this.accionSeleccionada === "listaNegra") {
        await this.enviarAListaNegra();
      }
      else if (this.esFechaSuperior) {
        await this.agendarAccion();
      }
      else {
        await this.registrarAccion();
      }

      //Comprobar si la accion es venta
      if (this.accionSeleccionada === "venta") {
        this.ejecutarVenta();
      }

      this.limpiarFormulario();
      //Ocultar formulario
      this.$emit("cancel");
    },

    cancelForm() {
      this.limpiarFormulario();
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

.form-row {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}

.radio-row {
  display: flex;
  align-items: center;
}

.radio-row input[type="radio"] {
  margin-right: 5px;
}



label {
  font-weight: bold;
}
</style>





  