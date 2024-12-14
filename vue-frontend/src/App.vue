<template>
  <div id="app">
    <!-- Conditionally render NavBar -->
    <NavBar v-if="$route.meta.showNavBar" />
    <!-- Dynamic content area for pages -->
    <router-view />
  </div>
</template>

<script>
import NavBar from './components/navBar.vue';

export default {
  name: 'App',
  components: {
    NavBar,
  },
};
</script>

<style>
/* Global resets or custom styles */
html,
body {
  margin: 0;
  padding: 0;
  font-family: Arial, Helvetica, sans-serif;
  
}

#app {
  min-height: 100vh;
}
</style>
