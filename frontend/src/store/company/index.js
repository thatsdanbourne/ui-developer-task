export default {
  state: {
    followedCompanies: [],
  },
  mutations: {
    FOLLOW_COMPANY(state, company) {
      state.followedCompanies.push(company);
    },
  },
  actions: {
    followCompany({ commit }, company) {
      commit('FOLLOW_COMPANY', company);
    },
  },
  getters: {
    getFollowedCompaniesCount: (state) => state.followedCompanies.length,
  },
};
