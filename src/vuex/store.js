import { createStore } from 'vuex';

const store = createStore({
  state: {
    correo: null,
    esAdmin: false,
  },
  mutations: {
    setCorreo(state, correo) {
      state.correo = correo;
    },
    setEsAdmin(state, esAdmin){
      state.esAdmin = esAdmin;
    }
  },
});

export default store;
