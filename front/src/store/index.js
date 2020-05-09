import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tours: [],
  },

  mutations: {
    setTours(state, tours) {
      state.tours = tours;
    }
  },

  actions: {
    getTours({commit}) {
      axios.get('http://localhost:3000/tours').then(res => {
        commit('setTours', res.data);
      });
    }
  },
});