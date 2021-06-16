<template>
  <div id="app">
    <header-layout />
    <search-page-layout />
    <notifications-list />
    <sidebar />
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import SearchPageLayout from './components/search-page-layout';
import headerLayout from './components/header';
import NotificationsList from './components/notifications-list.vue';
import Sidebar from './components/sidebar.vue';

export default {
  name: 'App',
  components: {
    SearchPageLayout,
    headerLayout,
    NotificationsList,
    Sidebar,
  },
  mounted() {
    this.INIT_STORE();
  },
  methods: {
    ...mapMutations(['INIT_STORE']),

  },
};
</script>

<style>
body{
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
</style>
