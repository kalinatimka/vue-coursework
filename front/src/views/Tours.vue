<template>
  <section class="tours">
    <h2>Tours</h2>
    <div class="wrapper">
      <sidebar/>
      <tour-viewer/>
    </div>
  </section>
</template>

<script>

import Sidebar from '../components/Sidebar';
import TourViewer from '../components/TourViewer';

export default {
  name: 'tours',
  components: {
    Sidebar,
    TourViewer,
  },
}
</script>

<style scoped>
h2 {
  margin: 0;
  text-align: center;
}

.tours {
  padding: 20px;
  background-color: #ebebeb;
}

.wrapper {
  display: flex;
}
</style>