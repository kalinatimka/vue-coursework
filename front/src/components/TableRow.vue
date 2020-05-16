<template>
  <tr>
    <!-- Unused component (check it) -->
    <td v-for="(col, ind) in Object.keys(rowData)" :key="ind">
      <input v-if="edit" v-model="obj[col]">
      <label v-else >{{rowData[col]}}</label>
    </td>
    <td>
      <div v-if="!edit">
        <button @click="editFields()">Изменить</button>
        <button @click="deleteRow(rowData)">Удалить</button>
      </div>
      <div v-else>
        <button>Сохранить</button>
        <button @click="closeEdit()">Отменить</button>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  data() {
    return {
      obj: Object.assign({}, this.tableData[this.rowIndex]),
      rowData: this.tableData[this.rowIndex],
      edit: false,
    }
  },
  name: 'table-row',
  props: {
    tableData: {
      type: Array,
      required: true,
    },
    rowIndex: {
      type: Number,
      required: true,
    },
    tableName: {
      type: String,
      required: true,
    }
  },
  methods: {
    editFields() {
      this.edit = true;
    },
    closeEdit() {
      this.obj = Object.assign({}, this.tableData[this.rowIndex]);
      this.edit = false;  
    },
    deleteRow(rowData) {
      console.log('beforeDelete', this.tableData);
      const indexForMySql = rowData[Object.keys(rowData)[0]]; // for MySql
      console.log('MySql index', indexForMySql);
      this.tableData.splice(this.rowIndex, 1);
      this.$store.commit('setTableData', this.tableData);
      console.log('afterDelete', this.tableData);
    }
  },
  watch: {
    rowIndex() {
      console.log(this.rowIndex);
    }
  }
}
</script>

<style scoped>
td {
  padding: 5px;
  background-color: #fff;
  border: 1px solid black;
}

input {
  width: 100%;
}

</style>