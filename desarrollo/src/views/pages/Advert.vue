<template>
  <section class="content">
    <div class="row center-block">
      <ul class="timeline">
        <li v-for="advert in advertsToView">
          <i v-bind:class="'fa fa-archive bg-yellow'"></i>
          <div class="timeline-item">
            <span class="time"><i class="fa fa-clock-o"></i>&nbsp;{{time(advert)}}</span>
            <h3 class="timeline-header">{{advert.title}}</h3>
            <div class="timeline-body">
              <p><b>Id: </b>{{advert.id}}</p>
              <label for="title">Título: </label>
              <input type="text" name="title" :value="advert.title" v-model="advert.title">

              <label for="desc_offer">Descripción: </label>
              <input type="text" name="desc_offer" :value="advert.desc_offer" v-model="advert.desc_offer">

              <label for="desc_ask">Busca: </label>
              <input type="text" name="desc_ask" :value="advert.desc_ask" v-model="advert.desc_ask">

              <p><b>Categoría ofertada: </b>{{advert.subcategoryOffered.name}}</p>
              <p><b>Categoría buscada: </b>{{advert.subcategoryDemanded.name}}</p>
              <label for="value">Valor: </label>
              <input type="number" name="value" :value="advert.value" v-model="advert.value">

              <p><b>Localidad: </b>{{advert.locality}}</p>
              <p><b>Provincia: </b>{{advert.province}}</p>
              <p><b>Código postal: </b>{{advert.postal_code}}</p>
              <p><b>Es actualización: </b>{{updated(advert)}}</p>
              <ul>
                <h2>Usuario</h2>
                <li v-for="(value, key) in advert.user">
                  <b>{{key}}: </b> {{value}}
                </li>
              </ul>
              <div v-if="advert.photos > 0">
                <b>Fotos:</b>
                <ul class="photos">
                  <li v-for="photo in getPhotos(advert)" class="photo">
                    <img :src="photo">
                  </li>
                </ul>
              </div>
            </div>
            <div class="timeline-footer" v-if="!id">
              <a class="btn btn-primary" v-bind:class="{'m-progress': callingAPI}" v-on:click="updateAdvert(advert)">Actualizar anuncio</a>
              <a class="btn btn-success" v-on:click="markAsReviewed(advert, true)">Marcar como revisado</a>
              <a class="btn btn-danger" v-on:click="markAsReviewed(advert, false)">Eliminar</a>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
  import moment from 'moment';
  import { ApiEndpoints } from '../../config';
  import { mapActions, mapState } from 'vuex';

  import { cloneDeep, noop, times } from 'lodash';

  export default {
    name: 'Advert',
    props: ['adverts', 'id'],
    data() {
      return {
        advertsToView: [],
        error: false
      };
    },
    mounted() {
      if (this.id) {
        this.getAdvertById(this.id)
        .then((response) => {
          if (response.status === 200) {
            this.advertsToView.push(response.data);
          } else {
            this.error = true;
          }
        });
      } else if (this.adverts.length > 0) {
        this.advertsToView = cloneDeep(this.adverts);
      }
    },
    watch: {
      adverts: function(newAdverts) {
        this.advertsToView = newAdverts;
      }
    },
    methods: {
      ...mapActions([
        'setAdvertAsReviewed', 'updateAdvertOnReview', 'getAdvertById'
      ]),

      /**
       * Rellena el numero original con ceros en la izq.
       * @param {Number} original - numero original
       * @param {Number} width - tamanyo del elemento final
       * @return {Array<number>} Numero final
       */
      pad(original, width) {
        let id = original.toString();

        if (original.toString().length < width) {
          for (let i = original.toString().length; i < width; i++) {
            id = '0' + id;
          }
        }

        let result = id.substring(0, id.length - 3);
        let last3 = result.substring(result.length - 1);
        let last2 = result.substring(result.length - 2, result.length - 1);
        let last = result.substring(0, result.length - 2);

        return [last, last2, last3];
      },

      getPhotos(advert) {
        let id = this.pad(advert.id, 6);
        let photos = [];

        times(advert.photos, (index) => {
          photos.push(`${ApiEndpoints.getBaseApi()}/static/items/${id[0]}/${id[1]}/${id[2]}/img_${advert.id}_${index}.jpg`);
        });

        return photos;
      },

      markAsReviewed(advert, result) {
        this.setAdvertAsReviewed({advert: advert, result: result});
      },

      updateAdvert(advert) {
        let advertToUpdate = cloneDeep(advert);

        advertToUpdate.user = noop();
        advertToUpdate.subcategoryOffered = noop();
        advertToUpdate.subcategoryDemanded = noop();
        advertToUpdate.photos = noop();
        advertToUpdate.created_at = noop();
        advertToUpdate.updatedAt = noop();

        this.updateAdvertOnReview(advertToUpdate);
      },

      time(advert) {
        return moment(advert.created_at).format('YYYY-MM-DD HH:mm');
      },

      updated(advert) {
        return !!advert.updated;
      }
    },
    computed: {
      ...mapState([
        'callingAPI'
      ]),

      today() {
        return moment().format('MMM Do YY');
      }
    }
  };
</script>

<style lang="scss">
  @import '~styles/main.scss';

  .timeline-body {
    label {
      width: 80px;
    }

    input {
      width: calc(100% - 110px);
    }
  }

  .timeline-footer {
    text-align: right;
  }
  .photos {
    list-style: none;

    .photo {
      max-width: 300px;

      img {
        width: 100%;
      }
    }
  }

  @keyframes ld {
    0%   { transform: rotate(0deg) scale(1); }
    50%  { transform: rotate(180deg) scale(1.1); }
    100% { transform: rotate(360deg) scale(1); }
  }
</style>
