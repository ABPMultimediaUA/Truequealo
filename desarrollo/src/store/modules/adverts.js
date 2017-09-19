import Api from '../../api';

const state = {
  adverts: []
};

const actions = {
  getAdverts(context) {
    return Api.request('get', 'ADVERT', null, { limit: 1000000 })
    .then((response) => {
      let data = response.data;

      if (response.status === 200) {
        context.commit('setAdverts', data);
      }
    });
  },
  getAdvertById(context, id) {
    return Api.request('get', 'ADVERT', null, {}, id);
  }
};

const mutations = {
  setAdverts(state, adverts) {
    state.adverts = adverts;
  },
  removeFromAdverts(state, advert) {
    state.adverts.splice(state.adverts.indexOf(advert), 1);
  }
};

const getters = {
  adverts: state => state.adverts
};

export default {
  state,
  actions,
  mutations,
  getters
};
