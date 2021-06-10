<template>
  <transition-group class="notifications-list">
      <notification
      v-for="notification in getNotifications"
      :key="notification.id"
      :notification="notification"/>
  </transition-group>
</template>

<script>
import { mapGetters } from 'vuex';
import Notification from './notification.vue';

export default {
  components: {
    Notification,
  },
  computed: {
    ...mapGetters(['getNotifications']),
  },
};
</script>

<style scoped>
.notifications-list {
  position: absolute;
  top: 80px;
  right: 0;
  margin-right: 15px;
  width: 300px;
}
</style>
