export default {
  state: {
    followedCompanies: [],
  },
  mutations: {
    FOLLOW_COMPANY(state, company) {
      state.followedCompanies.push(company);
    },
    UNFOLLOW_COMPANY(state, companyID) {
      const index = state.followedCompanies.map((c) => c.company_id).indexOf(companyID);

      state.followedCompanies.splice(index, 1);
    },
  },
  actions: {
    followCompany({ commit }, company) {
      commit('FOLLOW_COMPANY', company);
    },
    unfollowCompany({ commit }, companyID) {
      commit('UNFOLLOW_COMPANY', companyID);
    },
  },
  getters: {
    getFollowedCompanies: (state) => state.followedCompanies,
  },
};
