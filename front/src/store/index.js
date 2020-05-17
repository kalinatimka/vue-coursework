import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: '',
    tours: [],
    tables: [],
    tableData: [],
    queryData: [],
  },

  mutations: {
    setTours(state, tours) {
      state.tours = tours;
    },
    setTables(state, tables) {
      state.tables = tables;
    },
    setTableData(state, tableData) {
      state.tableData = tableData;
    },
    setQueryData(state, queryData) {
      state.queryData = queryData;
    },
    setError(state, error) {
      state.error = error;
    },
    deleteRowFromTableData(state, index) {
      state.tableData.splice(index, 1);
    }
  },

  actions: {
    getTours({commit}, fullPath) {
      axios.get('http://localhost:3000' + fullPath).then(res => {
        commit('setTours', res.data);
      });
    },

    getTables({commit}) {
      axios.get('http://localhost:3000/tables').then(res => {

        commit('setTables', res.data);
      });
    },

    getTableData({commit}, tableName) {
      axios.get('http://localhost:3000/table/' + tableName).then(res => {
        const arr = res.data.reduce((acc, data) => {
          acc.push({
            data,
            edit: false,
          })
          return acc;
        }, []);
        commit('setTableData', arr);
      });
    },

    sendRequest({commit}, query) {
      axios.post('http://localhost:3000/query', {query: query}).then(res => {
        commit('setQueryData', res.data);
      }).catch((err) => {
        commit('setError', err.response.data.message);
      });
    },

    deleteRow({commit}, {
      tableName,
      indexForMySql,
      colName,
      index
    }) {
      axios.delete('http://localhost:3000/delete', { data: {
        tableName, 
        indexForMySql,
        colName,
      }}).then(() => {
        commit('deleteRowFromTableData', index);
      });
    }
  },
});