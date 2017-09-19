import Api from '../../api';

const state = {
  advertsOnReview: []
};

const actions = {
  getAdvertsOnReview(context) {
    return Api.authRequest('get', 'ONREVIEW')
    .then((response) => {
      let data = response.data;

      if (response.status === 200) {
        context.commit('setAdvertsOnReview', data.reverse());
      }
    });
  },

  setAdvertAsReviewed({commit, state}, payload) {
    let body = {
      state: payload.result
    };

    return Api.authRequest('put', 'ONREVIEW', body, null, payload.advert.id)
    .then((response) => {
      if (response.status === 204) {
        commit('removeFromAdvertsOnReview', payload.advert);
      }
    });
  },

  updateAdvertOnReview({commit, state}, advert) {
    commit('TOGGLE_LOADING');
    return Api.authRequest('put', 'ONREVIEW', advert, null, advert.id)
    .then((response) => {
      if (response.status === 200) {
        commit('TOGGLE_LOADING');
      }
    });
  }
};

const mutations = {
  setAdvertsOnReview(state, advertsOnReview) {
    state.advertsOnReview = advertsOnReview;
  },
  removeFromAdvertsOnReview(state, advert) {
    state.advertsOnReview.splice(state.advertsOnReview.indexOf(advert), 1);
  }
};

const getters = {
  advertsOnReview: state => state.advertsOnReview
};

export const AdvertsOnReview = {
  state,
  actions,
  mutations,
  getters
};
