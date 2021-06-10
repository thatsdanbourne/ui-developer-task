import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import notifications from './notifications';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    jobs: [],
    followedCompanies: [],
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
    getShortlistedJobsCount: (state) => state.jobs.filter((job) => job.shortlisted === true).length,
  },
  modules: { notifications },
});
