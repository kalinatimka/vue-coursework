<template>
  <ul>
    <li v-for="facility in facilitiesObj" :key="facility.name">
      <img :src="require('../assets/' + facility.source)" :alt="facility.name" :title="facility.name">
    </li>
  </ul>
</template>

<script>
export default {
  name: 'features-picker',
  props: {
    facilitiesObj: {
      type: Object,
      required: true,
    }
  },
}
</script>

<style scoped>
ul {
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
}

li {
  position: relative;
  margin-right: 5px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #42b983;
}

li img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 90%;
}
</style>