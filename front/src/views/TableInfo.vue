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
            <input v-if="row.edit && !(i == 0)" v-model="inputData[colKey]">
            <label v-else>{{row.data[colKey]}}</label>
          </td>
          <td>
            <div v-if="!row.edit">
              <button :disabled="disableButton" @click="editFields(row)">Изменить</button>
              <button :disabled="disableButton" @click="deleteRow(row, ind)">Удалить</button>
            </div>
            <div v-else>
              <button @click="updateRow(row, ind)">Сохранить</button>
              <button @click="closeEdit(row)">Отменить</button>
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
      isEditMode: false,
      inputData: {},
    }
  },

  computed: {
    ...mapState({
      tableData: state => state.tableData,
    }),
    disableButton() {
      return this.isEditMode;
    }
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
    deleteRow(row, index) {
      const colName = Object.keys(row.data)[0];
      const indexForMySql = row.data[colName]; // for MySql
      this.$store.dispatch('deleteRow', {
        tableName: this.tableName,
        indexForMySql,
        colName,
        index,
      });
    },
    editFields(row) {
      this.inputData = Object.keys(row.data).reduce((acc, item, index) => {
        if (index == 0) {
          return acc;
        }
        acc[item] = row.data[item];
        return acc;
      }, {});
      // this.inputData = Object.assign({}, row.data);
      this.isEditMode = true;
      row.edit = true;
    },
    closeEdit(row) {
      this.inputData = {};
      this.isEditMode = false;
      row.edit = false;
    },
    updateRow(row, index) {
      const colName = Object.keys(row.data)[0];
      const indexForMySql = row.data[colName];
      const isEqual = Object.keys(this.inputData).every((key) => {
        return this.inputData[key] === row.data[key];
      });
      if (!isEqual) {
        this.$store.dispatch('updateRow', {
          tableName: this.tableName,
          indexForMySql,
          newData: this.inputData,
          index,
          colName,
        }).then(() => {
          this.inputData = {};
          this.isEditMode = false;
          row.edit = false;
        });
      } else {
        this.inputData = {};
        this.isEditMode = false;
        row.edit = false;
      }
    },
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
  padding: 5px;
  color: #ffffff;
  background-color: #42b983;
}

table, th {
  border: 1px solid #000000;
}

td {
  padding: 5px;
  background-color: #ffffff;
  border: 1px solid #000000;
}

input {
  width: 100%;
}
</style>