import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import actions from './actions';
import mutations from './mutations';
import { AdvertsOnReview } from './modules/adverts-onreview';
import users from './modules/users';
import adverts from './modules/adverts';

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules: {
    AdvertsOnReview,
    users,
    adverts
  }
});
