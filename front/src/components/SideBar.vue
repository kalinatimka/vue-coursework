<template>
  <aside>
    <h3>Filters:</h3>
    <article class="field">
      <h4>Country</h4>
      <ul>
        <li>
          <input type="checkbox" name="country" id="switherland" value="1" v-model="countries">
          <label for="switherland">Швейцария</label>
        </li>
        <li>
          <input type="checkbox" name="country" id="germany" value="2" v-model="countries">
          <label for="germany">Германия</label>
        </li>
      </ul>
      {{countries}}
    </article>
  </aside>
</template>

<script>
export default {
  name: 'sidebar',
  data() {
    return {
      countries: [],
      isInitLoad: true,
    }
  },
  created() {
    if (this.$route.query['country']) { // если в строке поиска есть фильтры, то отмечаем все чекбоксы этих фильтров
      this.countries.push(...this.$route.query['country']);
    } else {
      this.isInitLoad = false;
    }
  },
  watch: {
    countries: function() {
      if (this.isInitLoad) {
        this.isInitLoad = false;
        return;
      }
      this.$router.push({
        name: 'tours',
        query: {
          country: this.countries,
        },
      });
      this.$store.dispatch('getTours', this.$route.fullPath);
    }
  }
}
</script>

<style scoped>
aside {
  width: 300px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
}

aside h3 {
  margin: 0;
}

/* .field h4 {
  text-align: left;
} */
</style>