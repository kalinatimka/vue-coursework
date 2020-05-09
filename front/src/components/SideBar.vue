<template>
  <aside>
    <h3>Filters:</h3>
    <article class="field">
      <h4>Country</h4>
      <ul>
        <li>
          <input type="checkbox" name="country" id="switherland" value="1" v-model="country">
          <label for="switherland">Швейцария</label>
        </li>
        <li>
          <input type="checkbox" name="country" id="germany" value="2" v-model="country">
          <label for="germany">Германия</label>
        </li>
      </ul>
      {{country}}
    </article>
  </aside>
</template>

<script>
export default {
  name: 'sidebar',
  data() {
    return {
      country: [],
    }
  },
  watch: {
    country: function() {
      console.log(this.country);
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