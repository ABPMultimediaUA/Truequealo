import store from './../store';

let endpoints = {
  API_URLS: {
    QCMX: {
      name: 'QuieroCambiarloMX',
      url: 'https://api.quierocambiarlo.mx'
    },
    QCCOM: {
      name: 'QuieroCambiarloCom',
      url: 'https://api.quierocambiarlo.com'
    },
    LOCALHOST: {
      name: 'localhost',
      url: 'http://localhost:8080'
    }
  },
  AUTH: '/auth/local/admin',
  ONREVIEW: '/item-onreview',
  ADVERT: '/item',
  USER: '/user',
  getBaseApi: () => {
    if (!store.state.apiUrl && window.sessionStorage.apiUrl) {
      store.commit('SET_APIURL', window.sessionStorage.apiUrl);
    } else if (!store.state.apiUrl && !window.sessionStorage.apiUrl) {
      store.commit('SET_APIURL', endpoints.API_URLS.LOCALHOST.url);
    }

    return store.state.apiUrl;
  }
};

export default endpoints;
