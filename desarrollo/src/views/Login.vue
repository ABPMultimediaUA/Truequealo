;<template>
  <div class="container container-table">
      <div class="row vertical-10p">
        <div class="container">
          <img src="/static/img/logo-icono-transparencias.png" class="center-block logo">
          <div class="text-center col-md-4 col-sm-offset-4">
            <!-- login form -->
            <form class="ui form loginForm"  @submit.prevent="checkCreds">

              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-envelope"></i></span>
                <input class="form-control" name="email" placeholder="Username" type="text" v-model="email" required>
              </div>

              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                <input class="form-control" name="password" placeholder="Password" type="password" v-model="password" required>
              </div>

              <div class="input-group">
                <select class="form-control platform-selector" name="platform" placeholder="Plataforma" v-model="platform" required>
                  <option v-for="(platform, key) in platforms" v-bind:value="key">{{platform.name}}</option>
                </select>
              </div>

              <button type="submit" v-bind:class="'btn btn-primary btn-lg ' + loading">Submit</button>
            </form>

            <!-- errors -->
            <div v-if=response class="text-red"><p>{{response}}</p></div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import Api from '../api';
import { ApiEndpoints } from '../config';

export default {
  name: 'Login',
  data(router) {
    return {
      section: 'Login',
      loading: '',
      email: '',
      password: '',
      response: ''
    };
  },
  created() {
    this.platforms = ApiEndpoints.API_URLS;
  },
  methods: {
    checkCreds() {
      const {email, password, platform} = this;

      this.$store.commit('SET_APIURL', this.platforms[platform].url);

      this.toggleLoading();
      this.resetResponse();

      /* Making API call to authenticate a user */
      Api.request('post', 'AUTH', {email, password})
      .then(response => {
        this.toggleLoading();
        var data = response.data;

        /* Setting user in the state and caching record to the sessionStorage */
        if (data.admin) {
          var token = 'Bearer ' + data.token;

          this.$store.commit('SET_USER', data.admin);
          this.$store.commit('SET_TOKEN', token);

          if (window.sessionStorage) {
            window.sessionStorage.setItem('user', JSON.stringify(data.admin));
            window.sessionStorage.setItem('token', token);
          }

          this.$router.push('/');
        }
      })
      .catch(error => {
        this.$store.commit('TOGGLE_LOADING');
        console.error(error);

        this.response = 'Server appears to be offline';
        this.toggleLoading();
      });
    },
    toggleLoading() {
      this.loading = (this.loading === '') ? 'loading' : '';
    },
    resetResponse() {
      this.response = '';
    }
  }
};
</script>

<style>
html, body, .container-table {
  height: 100%;
  background-color: #282B30 !important;
}
.container-table {
    display: table;
    color: white;
}
.vertical-center-row {
    display: table-cell;
    vertical-align: middle;
}
.vertical-20p {
  padding-top: 20%;
}
.vertical-10p {
  padding-top: 10%;
}
.logo {
  width: 15em;
  padding: 3em;
}
.loginForm .input-group {
  padding-bottom: 1em;
  height: 4em;
}
.input-group input {
  height: 4em;
}

.input-group {
  width: 100%;
}

</style>
