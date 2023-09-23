<template>
  <div class="sidebar">
    <!-- Mostrar el título con la empresa -->
    <h2>Completar acción sobre {{ getEmpresa() }}</h2>

    <!-- Mostrar el formulario -->
    <form @submit.prevent="submitForm">
      <!-- Mostrar Asunto Objetivo -->
      <div class="form-row">
        <label for="asunto-objetivo">Asunto Objetivo</label>
        <input id="asunto-objetivo" :value="getAsuntoObjetivo()" readonly>
      </div>

      <!-- Mostrar Notas Objetivo -->
      <div class="form-row">
        <label for="notas-objetivo">Notas Objetivo</label>
        <textarea id="notas-objetivo" :value="getNotasObjetivo()" rows="4" style="resize: both" readonly />
      </div>

      <!-- Mostrar Asunto Realizado -->
      <div class="form-row">
        <label for="asunto-realizado">Asunto Realizado</label>
        <input id="asunto-realizado" v-model="formulario.asunto">
      </div>

      <!-- Mostrar Notas Realizadas -->
      <div class="form-row">
        <label for="notas-realizadas">Notas Realizadas</label>
        <textarea id="notas-realizadas" v-model="formulario.notas" rows="4" style="resize: both" />
      </div>

      <!-- Mostrar campo como nos conocio -->
      <div v-if="getPasoAccionAutomatica === 1" class="form-row">
        <label for="conocio-select">Como nos conoció</label>
        <select id="conocio-select" v-model="formulario.conocio" required>
          <option value="internet">
            Internet
          </option>
          <option value="otroCliente">
            A través de otro cliente
          </option>
          <option value="publicidad">
            Publicidad
          </option>
          <option value="otro">
            Otro...
          </option>
        </select>
      </div>

      <!-- Mostrar campo persona encargada de tomar decisión -->
      <div v-if="getPasoAccionAutomatica === 1">
        <p>¿Es la persona encargada en tomar la decisión?</p>
        <label>
          <input v-model="formulario.personaDecision" type="radio" value="1" required>
          Si
        </label>
        <span class="radio-separator" />
        <label>
          <input v-model="formulario.personaDecision" type="radio" value="0">
          No
        </label>
      </div>

      <!-- Mostrar campo plazo estimado (en días) -->
      <div v-if="getPasoAccionAutomatica === 1" class="form-row">
        <label for="plazo-estimadoDias">Plazo estimado (en días)</label>
        <input id="plazo-estimadoDias" v-model="formulario.plazoEstimadoDias" type="number" min="1" max="99999" required>
      </div>

      <!-- Mostrar campo guardar RI-->
      <div v-if="getPasoAccionAutomatica === 2" class="form-row">
        <label for="guardarRi">RI asignado</label>
        <input id="guardarRi" v-model="formulario.ri" type="number" min="1" max="999999999999" required>
      </div>

      <!-- Mostrar campos para el paso automático 6 -->
      <div v-if="getPasoAccionAutomatica === 6" class="form-row">
        <!-- Mostrar campos formas de pago -->
        <div>
          <p>¿Que forma de pago se utilizará?</p>
          <label>
            <input v-model="formulario.formaPago" type="radio" value="transferencia" required>
            Transferencia
          </label>
          <span class="radio-separator" />
          <label>
            <input v-model="formulario.formaPago" type="radio" value="financiacion">
            Financiación
          </label>
        </div>
        <!-- Mostrar campo fecha instalación provisional-->
        <div class="form-row">
          <label for="fechaInstalacionProvisional">Fecha de instalación provisional</label>
          <input id="fechaInstalacionProvisional" v-model="formulario.fechaInstalacionProvisional" type="date" required>
        </div>
      </div>



      <!-- Mostrar los botones "Completar acción" y "Cancelar" -->
      <div class="form-buttons">
        <button type="submit" class="submit-button">
          Completar acción
        </button>
        <span class="button-separator" />
        <button type="button" class="cancel-button" @click="cancelForm">
          Cancelar
        </button>
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
        accionSeleccionada: "",
        emitidoORecibido: "emitir",
        asunto: "",
        notas: "",
        fecha: "",
        hora: "",
        ri: null,
        conocio: "internet",
        personaDecision: '',
        plazoEstimadoDias: 1,
        formaPago: null,
        fechaInstalacionProvisional: null,
      },
      accionSeleccionada: "llamada",
      emitidoORecibido: "",
      mostrarFormulario: true,
      listaCorreos: ["prueba"],
      comercialAsignado: "",
    };
  },
  computed: {
    getPasoAccionAutomatica() {
      // Recupera el valor de pasoAutomatica desde el almacenamiento local
      const objetoSerializado = localStorage.getItem(
        "accionOportunidadVentaSeleccionada"
      );
      const objetoParseado = JSON.parse(objetoSerializado);
      const pasoAutomatica = objetoParseado[0].pasoAutomatica;

      // Devuelve null si la acción no es un paso automática.
      // Devuelve el nº de la acción en caso contrario.      
      //return pasoAutomatica !== "" && pasoAutomatica !== null;
      return pasoAutomatica;
    },
  },
  created() { },
  methods: {
    getEmpresa() {
      // Recupera la cadena de texto del almacenamiento local
      const objetoSerializado = localStorage.getItem(
        "accionOportunidadVentaSeleccionada"
      );

      const objetoParseado = JSON.parse(objetoSerializado);

      const empresa = objetoParseado[0].empresaOportunidad;

      return empresa;
    },
    getAsuntoObjetivo() {
      // Recupera la cadena de texto del almacenamiento local
      const objetoSerializado = localStorage.getItem(
        "accionOportunidadVentaSeleccionada"
      );

      const objetoParseado = JSON.parse(objetoSerializado);

      const asuntoObjetivo = objetoParseado[0].asuntoAccionObjetivo;

      return asuntoObjetivo;
    },
    getNotasObjetivo() {
      // Recupera la cadena de texto del almacenamiento local
      const objetoSerializado = localStorage.getItem(
        "accionOportunidadVentaSeleccionada"
      );

      const objetoParseado = JSON.parse(objetoSerializado);

      const notasObjetivo = objetoParseado[0].notasAccionObjetivo;

      return notasObjetivo;
    },
    getIdOportunidad() {
      // Recupera la cadena de texto del almacenamiento local
      const objetoSerializado = localStorage.getItem(
        "accionOportunidadVentaSeleccionada"
      );

      const objetoParseado = JSON.parse(objetoSerializado);

      const idOportunidad = objetoParseado[0].idOportunidad;

      return parseInt(idOportunidad);
    },
    getMiId() {
      // Recupera la cadena de texto del almacenamiento local
      const objetoSerializado = localStorage.getItem("id");

      // Convierte la cadena de texto nuevamente a un objeto utilizando JSON.parse()
      const miId = JSON.parse(objetoSerializado);

      return miId;
    },
    getAccionObjetivo() {
      // Recupera la cadena de texto del almacenamiento local
      const objetoSerializado = localStorage.getItem(
        "accionOportunidadVentaSeleccionada"
      );

      const objetoParseado = JSON.parse(objetoSerializado);

      const accionObjetivo = objetoParseado[0].accionObjetivo;

      return accionObjetivo;
    },
    getIdAccionOportunidad() {
      // Recupera la cadena de texto del almacenamiento local
      const objetoSerializado = localStorage.getItem(
        "accionOportunidadVentaSeleccionada"
      );

      const objetoParseado = JSON.parse(objetoSerializado);

      const idAccion = objetoParseado[0].idAccion;

      return parseInt(idAccion);
    },
    getEmitidoORecibidoObjetivo() {
      // Recupera la cadena de texto del almacenamiento local
      const objetoSerializado = localStorage.getItem(
        "accionOportunidadVentaSeleccionada"
      );

      const objetoParseado = JSON.parse(objetoSerializado);

      const emitidoORecibidoAccionObjetivo = objetoParseado[0].emitidoORecibidoAccionObjetivo;

      return parseInt(emitidoORecibidoAccionObjetivo);
    },
    async getIdDeCorreo(correo) {
      try {
        const response = await axios.post("/getIdFromCorreo", {
          correo: correo,
        });
        const { message } = response.data;
        const id = message;
        return id;
      } catch (error) {
        console.error("Error al obtener el ID del correo:", error);
        alert("Ha ocurrido un error al obtener el ID del correo");
        return null;
      }
    },
    //Creación de la segunda tarea automática
    async agendarAccionAutomaticaPaso2() {
      const idCorreo = await this.getMiId();
      const idOportunidad = await this.getIdOportunidad();

      const parametros = {
        idCorreo: idCorreo,
        idOportunidad: idOportunidad,
      };

      try {
        const response = await axios.post("/agendarAccionAutomatica2", parametros);
        const { message } = response.data;
        console.log(message);
        alert("Se ha generado la segunda acción automática para esta oportunidad de venta.\nAcción=> Enviar correo informativo EUREKA");
       // this.cancelForm();
      } catch (error) {
        alert("Ha ocurrido un error al generar la acción automática 2 para esta oportunidad de venta");
      }

    },
    async agendarAccionAutomaticaPaso3() {
      const idCorreo = await this.getMiId();
      const idOportunidad = await this.getIdOportunidad();

      const parametros = {
        idCorreo: idCorreo,
        idOportunidad: idOportunidad,
      };

      try {
        const response = await axios.post("/agendarAccionAutomatica3", parametros);
        const { message } = response.data;
        console.log(message);
        alert("Se ha generado la tercera acción automática para esta oportunidad de venta.\nAcción=> LLamada para coonocer si el cliente entendió la información");
        //this.cancelForm();
      } catch (error) {
        alert("Ha ocurrido un error al generar la acción automática 3 para esta oportunidad de venta");
      }

    },
    async agendarAccionAutomaticaPaso4() {
      const idCorreo = await this.getMiId();
      const idOportunidad = await this.getIdOportunidad();

      const parametros = {
        idCorreo: idCorreo,
        idOportunidad: idOportunidad,
      };

      try {
        const response = await axios.post("/agendarAccionAutomatica4", parametros);
        const { message } = response.data;
        console.log(message);
        alert("Se ha generado la cuarta acción automática para esta oportunidad de venta.\nAcción=> MAIL TIPO: enviar DEMO del software sin TPV");
        //this.cancelForm();
      } catch (error) {
        alert("Ha ocurrido un error al generar la acción automática 4 para esta oportunidad de venta");
      }

    },
    async agendarAccionAutomaticaPaso5() {
      const idCorreo = await this.getMiId();
      const idOportunidad = await this.getIdOportunidad();

      const parametros = {
        idCorreo: idCorreo,
        idOportunidad: idOportunidad,
      };

      try {
        const response = await axios.post("/agendarAccionAutomatica5", parametros);
        const { message } = response.data;
        console.log(message);
        alert("Se ha generado la quinta acción automática para esta oportunidad de venta.\nAcción=> LLamada: Conocer si ha entendido la DEMO y si no explicarsela");
        //this.cancelForm();
      } catch (error) {
        alert("Ha ocurrido un error al generar la acción automática 5 para esta oportunidad de venta");
      }

    },
    async agendarAccionAutomaticaPaso6() {
      const idCorreo = await this.getMiId();
      const idOportunidad = await this.getIdOportunidad();

      const parametros = {
        idCorreo: idCorreo,
        idOportunidad: idOportunidad,
      };

      try {
        const response = await axios.post("/agendarAccionAutomatica6", parametros);
        const { message } = response.data;
        console.log(message);
        alert("Se ha generado la sexta acción automática para esta oportunidad de venta.\nAcción=> LLamada: Cerrar la operación de venta");
       // this.cancelForm();
      } catch (error) {
        alert("Ha ocurrido un error al generar la acción automática 6 para esta oportunidad de venta");
      }

    },
    async completarAccionAutomaticaPaso1() {
      const idOportunidad = await this.getIdOportunidad();
      const conocio = this.formulario.conocio;
      const personaDecision = this.formulario.personaDecision;
      const plazoEstimadoDias = this.formulario.plazoEstimadoDias;


      const parametros = {
        idOportunidad: idOportunidad,
        conocio: conocio,
        personaDecision: personaDecision,
        plazoEstimadoDias: plazoEstimadoDias,
      };

      try {
        const response = await axios.post("/completarAccionAutomaticaPaso1", parametros);
        const { message } = response.data;
        console.log(message);
       // this.cancelForm();
      } catch (error) {
        alert("Ha ocurrido un error al completar la acción automática 1 para esta oportunidad de venta");
      }
    },
    async completarAccionAutomaticaPaso6() {
  const idOportunidad = await this.getIdOportunidad();
  const fechaInstalacionProvisional = new Date(this.formulario.fechaInstalacionProvisional);
  const fechaInstalacionProvisionalDia = fechaInstalacionProvisional.getDate(); 
  const fechaInstalacionProvisionalMes = fechaInstalacionProvisional.getMonth() + 1; 
  const fechaInstalacionProvisionalAño = fechaInstalacionProvisional.getFullYear();
  const formaPago = this.formulario.formaPago;

  const parametros = {
    idOportunidad: idOportunidad,
    fechaInstalacionProvisionalDia: fechaInstalacionProvisionalDia,
    fechaInstalacionProvisionalMes: fechaInstalacionProvisionalMes,
    fechaInstalacionProvisionalAño: fechaInstalacionProvisionalAño,
    formaPago: formaPago,
  };

  try {
    const response = await axios.post("/completarAccionAutomaticaPaso6", parametros);
    const { message } = response.data;
    console.log(message);
   // this.cancelForm();
  } catch (error) {
    alert("Ha ocurrido un error al completar la acción automática 6 para esta oportunidad de venta");
  }
},

    async completarAccion() {
      const fechaActual = new Date();
      const fechaDiaRealizada = fechaActual.getDate();
      const fechaMesRealizada = fechaActual.getMonth() + 1;
      const fechaAñoRealizada = fechaActual.getFullYear();
      const horaRealizada = fechaActual.getHours();
      const minutoRealizada = fechaActual.getMinutes();



      const data = {
        idAccionOportunidad: this.getIdAccionOportunidad(),
        //idOportunidad: this.getIdOportunidad(),
        idAutor: this.getMiId(),
        accionRealizada: this.getAccionObjetivo(),
        emitidoORecibidoRealizada: this.getEmitidoORecibidoObjetivo(),
        asuntoRealizada: this.formulario.asunto,
        notasRealizada: this.formulario.notas,
        riRealizada: this.formulario.ri,
        fechaDiaRealizada: fechaDiaRealizada,
        fechaMesRealizada: fechaMesRealizada,
        fechaAñoRealizada: fechaAñoRealizada,
        horaRealizada: horaRealizada,
        minutoRealizada: minutoRealizada,
        completada: 1
      };
      try {
        const response = await axios.post("/completarAccionOportunidad", data);
        const { message } = response.data;
        console.log(message);
        alert("Acción completada correctamente");

        //Agendar la siguiente acción automática en caso de estar en cola de automáticas.
        if (this.getPasoAccionAutomatica === 1) {
          await this.completarAccionAutomaticaPaso1();
          await this.agendarAccionAutomaticaPaso2();
        } else if (this.getPasoAccionAutomatica === 2) {
          await this.agendarAccionAutomaticaPaso3();
        } else if (this.getPasoAccionAutomatica === 3) {
          await this.agendarAccionAutomaticaPaso4();
        } else if (this.getPasoAccionAutomatica === 4) {
          await this.agendarAccionAutomaticaPaso5();
        } else if (this.getPasoAccionAutomatica === 5) {
          await this.agendarAccionAutomaticaPaso6();
        } else if (this.getPasoAccionAutomatica === 6) {
          await this.completarAccionAutomaticaPaso6();
        }

      } catch (error) {
        console.error("Error al completar la acción:", error);
        alert("Ha ocurrido un error al completar la acción");
      }
    },
    limpiarFormulario() {
      // Limpiar el formulario
      this.formulario = {
        accionSeleccionada: "",
        emitidoORecibido: "",
        asunto: "",
        notas: "",
        fecha: "",
        hora: "",
        ri: 0,
      };
    },
    async submitForm() {
      await this.completarAccion();
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

.radio-row {
  display: flex;
  align-items: center;
}

.radio-separator {
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
