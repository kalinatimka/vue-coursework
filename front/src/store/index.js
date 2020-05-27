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
    tourInfo: [],
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
    },
    updateTableDataRow(state, obj) {
      const newData = obj.newData;
      const index = obj.index;
      Object.keys(newData).forEach((key) => {
        state.tableData[index].data[key] = newData[key];
      });
    },
    setTourInfo(state, tourInfo) {
      state.tourInfo = tourInfo;
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

    deleteRow({commit}, {tableName, indexForMySql, colName, index}) {
      axios.delete('http://localhost:3000/delete', { data: {
        tableName, 
        indexForMySql,
        colName,
      }}).then(() => {
        commit('deleteRowFromTableData', index);
      });
    },

    updateRow({commit}, {tableName, indexForMySql, newData, index, colName}) {
      return axios.put('http://localhost:3000/update', {
        tableName,
        indexForMySql,
        newData,
        colName,
      }).then(() => {
        commit('updateTableDataRow', {index, newData});
      });
    },

    getTourInfo({commit}, tourId) {
      return axios.get('http://localhost:3000/tour-info/' + tourId).then((res) => {
        commit('setTourInfo', res.data);
      });
    },
  },
});