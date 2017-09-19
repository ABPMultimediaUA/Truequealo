import Api from '../../api';

const state = {
  users: []
};

const actions = {
  getUsers(context) {
    return Api.authRequest('get', 'USER')
    .then((response) => {
      let data = response.data;

      if (response.status === 200) {
        context.commit('setUsers', data);
      }

      return Promise.resolve();
    });
  },

  updateUser({commit, state}, user) {
    commit('TOGGLE_LOADING');
    return Api.authRequest('put', 'USER', user, null, user.id)
    .then((response) => {
      if (response.status === 200) {
        commit('TOGGLE_LOADING');
      }
    });
  }
};

const mutations = {
  setUsers(state, users) {
    state.users = users;
  }
};

const getters = {
  users: state => state.users
};

export default {
  state,
  actions,
  mutations,
  getters
};
