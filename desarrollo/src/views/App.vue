<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
    dataw() {
      return {
        section: 'Head'
      };
    },
    methods: {
    }
  };
</script>
