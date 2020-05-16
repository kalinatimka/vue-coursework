<template>
  <section>
    <h3>Свой запрос</h3>
    <div>
      <input type="text" label="Введите запрос" v-model="query" required @keyup.enter="submit">
      <button @click="submit">Запросить</button>
    </div>
    <p v-if="err">{{err}}</p>
    <table v-if="!err && queryData.length">
      <thead>
        <th v-for="(colName, i) in Object.keys(queryData[0])" :key="i">
          {{colName}}
        </th>
      </thead>
      <tbody>
        <tr v-for="(row, index) in queryData" :key="index">
          <td v-for="(col, ind) in Object.keys(row)" :key="ind">
            {{row[col]}}
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      query: ''
    };
  },

  computed: {
    ...mapState({
      err: store => store.error,
      queryData: store => store.queryData,
    }),
  },

  methods: {
    submit() {
      this.$store.commit('setError', '');
      this.$store.dispatch("sendRequest", this.query);
      this.query = '';
    }
  }
}
</script>

<style scoped>
section {
  padding-left: 20px;
}

h3 {
  text-align: center;
}
</style>