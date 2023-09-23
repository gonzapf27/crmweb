import { createRouter, createWebHistory } from "vue-router";

//import HomeView from '../views/HomeView.vue'
import LoginView from "../views/LoginView.vue";
import SignUpView from "../views/SingUpView.vue"; // Importa el componente SignUpView
import HomeView from "../views/HomeView.vue"; // Importa el componente SignUpView
import OportunidadesView from "../views/OportunidadesView.vue"; // Importa el componente SignUpView
import TareasPendientesView from "../views/TareasPendientesView.vue";
import ListaAccionesView from "../views/ListaAccionesView.vue";
import ListaClientesView from "../views/listaAcciones/ListaClientes.vue";

const routes = [
  {
    path: "/LoginView",
    name: "LoginView",
    component: LoginView,
  },
  {
    path: "/SingUpView",
    name: "SingUpView",
    component: SignUpView,
  },
  {
    path: "/HomeView",
    name: "HomeView",
    component: HomeView,
  },
  {
    path: "/OportunidadesView",
    name: "OportunidadesView",
    component: OportunidadesView,
  },
  {
    path: "/ListaAccionesView",
    name: "ListaAccionesView",
    component: ListaAccionesView,
  },
  {
    path: "/TareasPendientesView",
    name: "TareasPendientesView",
    component: TareasPendientesView,
  },
  {
    path: "/ListaClientes",
    name: "ListaClientesView",
    component: ListaClientesView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router; // Exporta la instancia del enrutador
