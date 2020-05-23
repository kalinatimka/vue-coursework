<template>
  <section class="admin-panel">
    <div class="container">
      <aside class="admin-tables-list">
        <p>
          <router-link :to="{name: 'selfRequest'}">Свой запрос</router-link>
        </p>
        <h3>Таблицы:</h3>
        <p v-for="table in tables" :key="table.name">
          <router-link :to="{name: 'tableName', params: {tableName: table.name}}">{{table.name}}</router-link>
        </p>
      </aside>
      <section class="admin-viewer">
        <h2 class="admin-header">Панель администратора: </h2>
        <router-view :key="$route.path" />
      </section>
    </div>
  </section>
</template>

<script>

import {mapState} from 'vuex';

export default {
  computed: {
    ...mapState({
      tables: state => state.tables,
    }),
  },
  created() {
    this.$store.dispatch('getTables');
  }
}
</script>

<style scoped>
.admin-viewer {
  width: 100%;
}

.admin-tables-list {
  /* background-color: #42b983; */
  width: 300px;
  border-right: 1px solid #000;
}

.admin-panel {
  padding: 20px;
  background-color: #ebebeb;
}

.admin-header {
  margin: 0;
  margin-bottom: 20px;
  text-align: center;
}

.container {
  display: flex;
  padding: 20px;
  border-radius: 20px;
  background-color: #ffffff;
}
</style>