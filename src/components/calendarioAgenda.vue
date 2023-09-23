<template>
  <div>
    <div v-if="!showSideBarCompletarAccion" class="calendar-view">
      <FullCalendar ref="calendarRef" :options="calendarOptions" />
    </div>
    <transition name="slide">
      <sideBarCompletarAccionOportunidadVenta v-if="showSideBarCompletarAccion" @cancel="hideSideBarCompletarAccion"
        @click.stop />
    </transition>
  </div>
</template>

<script>
import axios from "axios";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import sideBarCompletarAccionOportunidadVenta from "../components/sideBarCompletarAccionOportunidadVenta.vue";

export default {
  components: {
    FullCalendar,
    sideBarCompletarAccionOportunidadVenta,
  },
  props: {
    eventsData: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      showSideBarCompletarAccion: false,
      calendarOptions: {
        locale: esLocale,
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: "dayGridWeek", // Weekly initial view
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,dayGridWeek,dayGridDay", // View options
        },
        eventClick: (info) => {
          this.calendarEventClick(info);
        },
        events: [], // Initialize events as an empty array
      },
    };
  },
  async mounted() {
    await this.obtenerEventos();
  },
  methods: {
    async guardarAccionOportunidadVenta(info) {
      const idAccionOportunidadVenta =
        info.event.extendedProps.idAccionOportunidadVenta;

      //Guardamos el objeto de la oportunidadVenta seleccionada extraido desde la SQL
      const response = await axios.post("https://eurekacrm-server.onrender.com/getAccionOportunidadVentaFromId", {
        // Enviar los parámetros al servidor
        idAccionOportunidadVenta,
      });

      const { message } = response.data;
      let resultado = JSON.parse(message);

      // Convierte el objeto a una cadena de texto utilizando JSON.stringify()
      const accionOportunidadVentaSerializado = JSON.stringify(resultado);

      // Guarda la cadena de texto en el almacenamiento local
      localStorage.setItem(
        "accionOportunidadVentaSeleccionada",
        accionOportunidadVentaSerializado
      );
    },
    getMiId() {
      // Recupera la cadena de texto del almacenamiento local
      const objetoSerializado = localStorage.getItem("id");

      // Convierte la cadena de texto nuevamente a un objeto utilizando JSON.parse()
      const miId = JSON.parse(objetoSerializado);

      return miId;
    },
    async calendarEventClick(info) {
      //Guardamos el objeto serializado de la accionOportunidadVenta seleccionada
      await this.guardarAccionOportunidadVenta(info);

      //Mostramos el sideBar para completar la acción
      this.showSideBarCompletarAccion = true;
    },
    formatEventsData(eventsData) {
      return eventsData.map((event) => ({
        //title: event.asuntoObjetivo,
        title:
          event.empresa +
          "\n" +
          event.asuntoObjetivo,
        start: new Date(
          event.fechaAñoObjetivo,
          event.fechaMesObjetivo - 1,
          event.fechaDiaObjetivo,
          event.horaObjetivo,
          event.minutoobjetivo
        ),
        extendedProps: {
          idAccionOportunidadVenta: event.idAccionOportunidadVenta,
          notasObjetivo: event.notasObjetivo,
          tipo: "oportunidadVenta",
        },
      }));

     
    },
    async obtenerEventos() {
      try {
        const query = `
  SELECT
    ao.id AS idAccionOportunidadVenta,
    o.id AS idOportunidad,
    ao.accionobjetivo AS accionObjetivo,
    ao.asuntoobjetivo AS asuntoObjetivo,
    ao.notasobjetivo AS notasObjetivo,
    ao.fechadiaobjetivo AS fechaDiaObjetivo,
    ao.fechamesobjetivo AS fechaMesObjetivo,
    ao.fechaañoobjetivo AS fechaAñoObjetivo,
    ao.horaobjetivo AS horaObjetivo,
    ao.minutoobjetivo AS minutoobjetivo,
    ao.completada AS completada,
    o.empresa AS empresa
  FROM
    accionesOportunidades AS ao
  JOIN
    oportunidades AS o ON ao.idOportunidad = o.id
  JOIN
    usuarios AS u ON o.idComercialAsignado = u.id
  WHERE
    completada = ? AND u.id = ?`;
        const parametros = [
          0, // Completada = false
          this.getMiId(),
        ];

        const response = await axios.post("https://eurekacrm-server.onrender.com/query", {
          query: query,
          parametros: parametros,
        });

        const data = response.data;
        if (data && data.message) {
          const eventos = JSON.parse(data.message);
          if (Array.isArray(eventos)) {
            this.calendarOptions.events = this.formatEventsData(eventos);
          } else {
            console.error("Los datos obtenidos no son válidos:", eventos);
          }
        } else {
          console.error("Respuesta inválida:", data);
        }
      } catch (error) {
        console.error("Error al obtener eventos:", error);
      }
    },
    hideSideBarCompletarAccion() {
      this.showSideBarCompletarAccion = false;
    },
  },
};
</script>

<style>
.calendar-view {
  width: 100%;
  height: 100%;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}

/* Add custom styles for the calendar events */
.fc-event {
  font-size: 14px;
  /* Increase font size for event title */
  padding: 10px 15px;
  /* Add padding to increase the event size */
  background-color: #007bff;
  /* Change the background color of events */
  color: white;
  /* Change the text color of events to make it readable */
  border-radius: 5px;
  /* Add border radius to give rounded corners to events */
}

/* Optionally, you can add more custom styles for event types */
.fc-event.venta {
  background-color: #28a745;
  /* Change the background color for venta events */
}

.fc-event.llamada {
  background-color: #17a2b8;
  /* Change the background color for llamada events */
}

.fc-event.reunion {
  background-color: #ffc107;
  /* Change the background color for reunion events */
}

/* Increase the height of the calendar cells */
.fc-daygrid-day {
  height: 120px;
  /* Adjust the height as needed */
}

/* Increase the height of the calendar event container to show larger events */
.fc-daygrid-event-harness {
  height: 100%;
  /* Adjust the height as needed */
}
</style>
