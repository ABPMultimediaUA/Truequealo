<template>
  <div :class="['wrapper', classes]">
    <header class="main-header">
      <a href="/" class="logo">
        <!-- mini logo for sidebar mini 40x50 pixels -->
        <span class="logo-mini"><img src="/static/img/logo-icono-transparencias.png" alt="Logo" class="img-responsive center-block"></span>
        <!-- logo for regular state and mobile devices -->
        <div class="logo-lg">
          <img src="/static/img/logo-icono-transparencias.png" alt="Logo" class="img-responsive">
          <span>Truequéalo BO</span>
        </div>
      </a>

      <!-- Header Navbar -->
      <nav class="navbar navbar-static-top" role="navigation">
        <!-- Sidebar toggle button-->
        <a href="javascript:;" class="sidebar-toggle" data-toggle="offcanvas" role="button">
          <span class="sr-only">Toggle navigation</span>
        </a>
        <!-- Navbar Right Menu -->
        <div class="navbar-custom-menu">
          <ul class="nav navbar-nav">
            <!-- Messages-->
            <li class="dropdown messages-menu">
              <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                <i class="fa fa-envelope-o"></i>
                <span class="label label-success">{{ userInfo.messages | count }}</span>
              </a>
              <ul class="dropdown-menu">
                <li class="header">You have {{ userInfo.messages | count }} message(s)</li>
                <li v-if="userInfo.messages.length > 0">
                  <!-- inner menu: contains the messages -->
                  <ul class="menu">
                    <li><!-- start message -->
                      <a href="javascript:;">
                        <!-- Message title and timestamp -->
                        <h4>
                          Support Team
                          <small><i class="fa fa-clock-o"></i> 5 mins</small>
                        </h4>
                        <!-- The message -->
                        <p>Why not consider this a test message?</p>
                      </a>
                    </li>
                    <!-- end message -->
                  </ul>
                  <!-- /.menu -->
                </li>
                <li class="footer" v-if="userInfo.messages.length > 0"><a href="javascript:;">See All Messages</a></li>
              </ul>
            </li>
            <!-- /.messages-menu -->

            <!-- Notifications Menu -->
            <li class="dropdown notifications-menu">
              <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                <i class="fa fa-bell-o"></i>
                <span class="label label-warning">{{ userInfo.notifications | count }}</span>
              </a>
              <ul class="dropdown-menu">
                <li class="header">You have {{ userInfo.notifications | count }} notification(s)</li>
                <li>
                  <!-- Inner Menu: contains the notifications -->
                  <ul class="menu">
                    <li><!-- start notification -->
                      <a href="javascript:;">
                        <i class="fa fa-users text-aqua"></i> 5 new members joined today
                      </a>
                    </li>
                    <!-- end notification -->
                  </ul>
                </li>
                <li class="footer" v-if="userInfo.notifications.length > 0"><a href="javascript:;">View all</a></li>
              </ul>
            </li>

            <!-- Tasks Menu -->
            <li class="dropdown tasks-menu">
              <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                <i class="fa fa-archive"></i>
                <span class="label label-danger">{{ advertsOnReview | count }} </span>
              </a>
              <ul class="dropdown-menu">
                <li class="header">Tienes {{ advertsOnReview | count }} anuncios por revisar</li>
                <li>
                  <!-- Inner menu: contains the tasks -->
                  <ul class="menu">
                    <!-- end task item -->
                  </ul>
                </li>
                <li class="footer" v-if="advertsOnReview.length > 0">
                  <router-link to="/onreview"><a href="javascript:;">Revisar todos los anuncios</a></router-link>
                </li>
              </ul>
            </li>

            <!-- User Account Menu -->
            <li class="dropdown user user-menu">
              <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                <!-- The user image in the navbar-->
                <!-- hidden-xs hides the username on small devices so only the image appears. -->
                <span class="hidden-xs" v-if="user">{{ user.email }}</span>
              </a>
              <ul class="dropdown-menu">
                <li class=""><a href="javascript:;" v-on:click="logout()">Logout</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <!-- Left side column. contains the logo and sidebar -->
    <sidebar/>

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <section class="content-header">
        <h1>
          {{$route.name.toUpperCase() }}
          <small>{{ $route.meta.description }}</small>
        </h1>
        <ol class="breadcrumb">
          <li><a href="javascript:;"><i class="fa fa-home"></i>Home</a></li>
          <li class="active">{{$route.name.toUpperCase()}}</li>
        </ol>
      </section>
      <router-view></router-view>
    </div>
    <!-- /.content-wrapper -->

    <!-- Main Footer -->
    <!-- <footer class="main-footer">
      <strong>Copyright &copy; {{year}} <a href="javascript:;">Truequealo</a>.</strong> All rights reserved.
    </footer> -->
  </div>
  <!-- ./wrapper -->
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import { config } from '../config';
import Sidebar from './Sidebar';
import 'hideseek';

export default {
  name: 'Dash',
  components: {
    Sidebar
  },
  data: function() {
    return {
      year: new Date().getFullYear(),
      classes: {
        fixed_layout: config.fixedLayout,
        hide_logo: config.hideLogoOnMobile
      },
      error: ''
    };
  },
  created() {
    this.initData();
  },
  computed: {
    ...mapState([
      'userInfo', 'user'
    ]),
    ...mapGetters({
      advertsOnReview: 'advertsOnReview'
    })
  },
  methods: {
    ...mapActions([
      'getAdvertsOnReview', 'getAdverts', 'getUsers'
    ]),

    changeloading() {
      this.$store.commit('TOGGLE_SEARCHING');
    },

    logout() {
      this.$store.commit('SET_USER', null);
      this.$store.commit('SET_TOKEN', null);
      this.$store.commit('SET_APIURL', null);

      if (window.sessionStorage) {
        window.sessionStorage.setItem('user', null);
        window.sessionStorage.setItem('token', null);
      }

      this.$router.push('/login');
    },

    initData() {
      this.getAdvertsOnReview();

      // this.getAdverts();

      // this.getUsers();
    }
  }
};
</script>

<style lang="scss">
.wrapper {
  .main-header {
    position: fixed;
    width: 100%;
  }

  .content-wrapper {
    padding-top: 50px;
    height: calc(100vh);
    overflow-y: scroll;
  }

  .main-sidebar {
    position: fixed;
    height: 100vh;
  }
}

.wrapper.hide_logo {
  @media (max-width: 767px) {
    .main-header .logo {
      display: none;
    }
  }
}

.logo-mini, .logo-lg {
  text-align: left;

  img {
    padding: .4em;
  }
}

.logo-lg {
  img {
    display: -webkit-inline-box;
    width: 25%;
  }
}
.user-panel {
  height: 4em;
}

hr.visible-xs-block {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.17);
  height: 1px;
  border-color: transparent;
}
</style>
