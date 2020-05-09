<template>
  <section>
    <!-- Tags -->
    <ul>
      <li v-for="tour in tours" :key="tour.id">
        <tour-card :tour="tour"/>
      </li>
    </ul>
    <!-- Pages -->
  </section>
</template>

<script>

import {mapState} from 'vuex';
import TourCard from './TourCard';

export default {
  name: 'tour-viewer',

  components: {
    TourCard,
  },

  computed: {
    ...mapState({
      tours: state => state.tours,
    }),
  },

  created: function() {
    console.log(this.$route.query);
    this.$store.dispatch('getTours');
  }
}
</script>

<style scoped>
section {
  margin-left: 20px;
  width: 100%;
}
ul {
  padding: 0;
  margin: 0;
  list-style: none;
}
</style>