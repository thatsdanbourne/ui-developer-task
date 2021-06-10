import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import notifications from './notifications';
import company from './company';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    jobs: [],
    followedCompanies: [],
    sidebarOpen: false,
  },
  mutations: {
    SET_JOBS(state, jobs) {
      state.jobs = jobs;
    },
    TOGGLE_JOB_SHORTLIST(state, job) {
      const jobIndex = state.jobs.map((item) => item.id).indexOf(job.id);

      if (job.shortlisted) {
        state.jobs[jobIndex].shortlisted = false;
      } else {
        state.jobs[jobIndex].shortlisted = true;
      }
    },
    TOGGLE_SIDEBAR(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
  },
  actions: {
    getResults({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('/api/search/jobs').then((response) => {
          const results = response.data.map((job) => {
            const item = job;
            item.shortlisted = false;
            return item;
          });
          commit('SET_JOBS', results);
          resolve(results);
        })
          .catch((err) => {
            reject(err);
          });
      });
    },
    toggleJobShortlist({ commit, dispatch }, job) {
      commit('TOGGLE_JOB_SHORTLIST', job);

      dispatch('addNotification', { job, type: job.shortlisted ? 'shortlisted' : 'unshortlisted' });
    },
  },
  getters: {
    getJobs: (state) => state.jobs,
    getShortlistedJobs: (state) => state.jobs.filter((job) => job.shortlisted === true),
  },
  modules: { notifications, company },
});
