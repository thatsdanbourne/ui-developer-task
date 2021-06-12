import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import notifications from './notifications';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    jobs: [],
    shortlistedItems: [],
    sidebarOpen: false,
  },
  mutations: {
    INIT_STORE(state) {
      console.log(localStorage.getItem('shortlistedItems'));
      if (!(localStorage.getItem('shortlistedItems') === null)) {
        state.shortlistedItems = JSON.parse(localStorage.getItem('shortlistedItems'));
      }
    },
    UPDATE_LOCAL_STORAGE(state) {
      localStorage.shortlistedItems = JSON.stringify(state.shortlistedItems);
    },
    SET_JOBS(state, jobs) {
      state.jobs = jobs;
    },
    ADD_JOB_TO_SHORTLIST(state, job) {
      const item = {
        ...job,
        type: 'job',
      };

      state.shortlistedItems.push(item);
    },
    REMOVE_JOB_FROM_SHORTLIST(state, jobID) {
      const index = state.shortlistedItems.findIndex((item) => {
        if (item.type === 'job' && item.id === jobID) {
          return true;
        }

        return false;
      });

      state.shortlistedItems.splice(index, 1);
    },
    ADD_COMPANY_TO_SHORTLIST(state, company) {
      state.shortlistedItems.push({
        ...company,
        type: 'company',
      });
    },
    REMOVE_COMPANY_FROM_SHORTLIST(state, companyID) {
      const index = state.shortlistedItems.findIndex((item) => {
        if (item.type === 'company' && item.id === companyID) {
          return true;
        }

        return false;
      });

      state.shortlistedItems.splice(index, 1);
    },
    TOGGLE_SIDEBAR(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
  },
  actions: {
    getResults({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('/api/search/jobs').then((response) => {
          commit('SET_JOBS', response.data);
          resolve(response.data);
        })
          .catch((err) => {
            reject(err);
          });
      });
    },
    addJobToShortlist({ commit }, job) {
      commit('ADD_JOB_TO_SHORTLIST', job);
      commit('UPDATE_LOCAL_STORAGE');
    },
    removeJobFromShortlist({ commit }, jobID) {
      commit('REMOVE_JOB_FROM_SHORTLIST', jobID);
      commit('UPDATE_LOCAL_STORAGE');
    },
    addCompanyToShortlist({ commit }, company) {
      commit('ADD_COMPANY_TO_SHORTLIST', company);
      commit('UPDATE_LOCAL_STORAGE');
    },
    removeCompanyFromShortlist({ commit }, companyID) {
      commit('REMOVE_COMPANY_FROM_SHORTLIST', companyID);
      commit('UPDATE_LOCAL_STORAGE');
    },
  },
  getters: {
    getJobs: (state) => state.jobs,
    getShortlistedItems: (state) => state.shortlistedItems,
    getShortlistedJobs: (state) => state.shortlistedItems.filter((item) => item.type === 'job'),
    getShortlistedCompanies: (state) => state.shortlistedItems.filter((item) => item.type === 'company'),

  },
  modules: { notifications },
});
