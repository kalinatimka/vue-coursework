<template>
  <div id="app">
    <the-navigation></the-navigation>
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <router-view :key="$route.path"/>
  </div>
</template>

<script>

import TheNavigation from './components/TheNavigation';

export default {
  name: 'App',
  components: {
    'the-navigation': TheNavigation,
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
