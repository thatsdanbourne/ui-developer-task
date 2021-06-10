export default {
  state: {
    notifications: [],
  },
  getters: {
    getNotifications: (state) => state.notifications,
  },
  mutations: {
    ADD_NOTIFICATION(state, notification) {
      state.notifications.push({
        ...notification,
        id: Math.ceil(Math.random() * 1000000),
      });
    },
    REMOVE_NOTIFICATON(state, notificationID) {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== notificationID,
      );
    },
  },
  actions: {
    addNotification({ commit }, notification) {
      commit('ADD_NOTIFICATION', notification);
    },
    removeNotification({ commit }, notificationID) {
      commit('REMOVE_NOTIFICATON', notificationID);
    },
  },
};
