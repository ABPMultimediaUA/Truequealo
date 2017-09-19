<template>
  <advert :adverts="advertsOnReview"></advert>
</template>
<script>
  import Advert from './Advert';
  import { mapGetters } from 'vuex';

  export default {
    name: 'AdvertsOnReview',
    components: { Advert },
    data() {
      return {};
    },
    created() {
    },
    computed: {
      ...mapGetters([
        'advertsOnReview'
      ])
    }
  };
</script>

<style>

</style>
