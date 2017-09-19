<template>
  <ul class="sidebar-menu">
    <li class="header">TOOLS</li>
    <li class="pageLink" v-for="route in routes" v-if="route.icon">
      <router-link :to="'/'+route.path">
        <i :class="'fa fa-'+route.icon"></i>
        <span class="page">{{route.name}}</span>
      </router-link>
    </li>
  </ul>
</template>
<script>
import routes from '../routes';

export default {
  name: 'SidebarName',
  computed: {
    routes() {
      return routes[1].children;
    }
  }
};
</script>
<style lang="scss">
  /* override default */
  .sidebar-menu>li>a {
    padding: 12px 15px 12px 15px;
  }

  .pageLink {
    .router-link-exact-active {
      color: #fff !important;
      background: #1e282c !important;
      border-left-color: #605ca8 !important;
    }
  }

  .sidebar-menu li.active>a>.fa-angle-left, .sidebar-menu li.active>a>.pull-right-container>.fa-angle-left {
    animation-name: rotate;
    animation-duration: .2s;
    animation-fill-mode: forwards;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(-90deg);
    }
  }
</style>
