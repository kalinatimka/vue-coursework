<template>
  <aside>
    <h3>Фильтры:</h3>
    <article class="field">
      <h4>Страна</h4>
      <ul>
        <li>
          <input type="checkbox" id="switherland" value="1" v-model="countries">
          <label for="switherland">Швейцария</label>
        </li>
        <li>
          <input type="checkbox" id="germany" value="2" v-model="countries">
          <label for="germany">Германия</label>
        </li>
      </ul>
      {{countries}}
    </article>
    <article class="field">
      <h4>Удобства</h4>
      <ul>
        <li>
          <input type="checkbox" id="wifi" value="1" v-model="wifi">
          <label for="wifi">Wi-Fi</label>
        </li>
        <li>
          <input type="checkbox" id="conditioner" value="1" v-model="conditioner">
          <label for="conditioner">Кондиционер</label>
        </li>
        <li>
          <input type="checkbox" id="parking" value="1" v-model="parking">
          <label for="parking">Бесплатная парковка</label>
        </li>
      </ul>
    </article>
  </aside>
</template>

<script>

export default {
  name: 'sidebar',

  data() {
    return {
      countries: this.$route.query['country'] ? [].concat(this.$route.query['country']) : [],
      wifi: this.$route.query['wifi'] ? [].concat(this.$route.query['wifi']) : [],
      conditioner: this.$route.query['conditioner'] ? [].concat(this.$route.query['conditioner']) : [],
      parking: this.$route.query['parking'] ? [].concat(this.$route.query['parking']) : [],
    }
  },

  methods: {
    setQueryParameters() {
      this.$router.push({
        name: 'tours',
        query: {
          country: this.countries,
          wifi: this.wifi,
          conditioner: this.conditioner,
          parking: this.parking,
        },
      });
      this.$store.dispatch('getTours', this.$route.fullPath);
    },
  },

  watch: {
    countries: function() {
      this.setQueryParameters();
    },
    wifi: function() {
      this.setQueryParameters();
    },
    conditioner: function() {
      this.setQueryParameters();
    },
    parking: function() {
      this.setQueryParameters();
    },
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