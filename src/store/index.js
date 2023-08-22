import { createStore } from 'vuex';

export default createStore({
  state: {
    mediaArray: {},
  },
  getters: {},
  mutations: {
    changeMediaArray(state, e) {
      state.mediaArray = e;
    },
  },
  actions: {},
  modules: {},
});
