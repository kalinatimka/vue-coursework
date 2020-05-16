<template>
  <section>
    <h3>{{tableName}}</h3>
    <table v-if="tableData.length">
      <thead>
        <th v-for="(colName, i) in Object.keys(tableData[0].data)" :key="i">
          {{colName}}
        </th>
        <th>Манипуляции</th>
      </thead>
      <tbody>
        <tr v-for="(row, ind) in tableData" :key="ind">
          <td v-for="(colKey, i) in Object.keys(row.data)" :key="i">
            <input v-if="row.edit" v-model="inputData[colKey]">
            <label v-else>{{row.data[colKey]}}</label>
          </td>
          <td>
            <div v-if="!row.edit">
              <button @click="editFields(row, ind)">Изменить</button>
              <button @click="deleteRow(row, ind)">Удалить</button>
            </div>
            <div v-else>
              <button @click="updateRow()">Сохранить</button>
              <button @click="closeEdit(ind)">Отменить</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    {{tableData}}
    <br/>
    {{inputData}}
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      // edit: false,
      inputData: {},
    }
  },

  computed: {
    ...mapState({
      tableData: state => state.tableData,
    }),
  },

  props: {
    tableName: {
      type: String,
      required: true,
    },
  },

  created() {
    this.$store.dispatch('getTableData', this.tableName);
  },

  methods: {
    deleteRow(rowData, index) {
      // const indexForMySql = rowData[Object.keys(rowData)[0]]; // for MySql
      // console.log('MySql index', indexForMySql);
      this.tableData.splice(index, 1);
      this.$store.commit('setTableData', this.tableData);
    },
    editFields(row, ind) {
      this.inputData = Object.assign({}, row.data);
      this.tableData[ind].edit = true;
    },
    closeEdit(ind) {
      this.inputData = {};
      this.tableData[ind].edit = false;
    }
  },
}
</script>

<style scoped>
section {
  margin-left: 20px;
}

h3 {
  text-align: center;
}

table {
  width: 100%;
  background-color: #000;
}

th {
  background-color: #fff;
  padding: 5px;
}

table, th {
  border: 1px solid black;
}

td {
  padding: 5px;
  background-color: #fff;
  border: 1px solid black;
}

input {
  width: 100%;
}
</style>