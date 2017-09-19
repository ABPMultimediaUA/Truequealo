<template>
  <section class="content">
    <div class="row center-block">
      <div class="col-md-12">
        <div class="box">
          <!-- /.box-header -->
          <div class="box-body">
            <div class="dataTables_wrapper form-inline dt-bootstrap" id="adverts_wrapper">
              <div class="row">
                <div class="col-sm-12 table-responsive">
                  <vuetable ref="vuetable"
                    api-url="https://api.quierocambiarlo.mx/item"
                    :fields="['id', 'title']" data-path=""
                    pagination-path="">
                  </vuetable>
                  <vuetable-pagination ref="pagination"></vuetable-pagination>
                </div>
              </div>
            </div>
            <!-- /.box-body -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { ApiEndpoints } from '../../config';
  import { Vuetable, VuetablePagination } from 'vuetable-2';

  // Require needed datatables modules
  import 'datatables.net';
  import 'datatables.net-bs';

  export default {
    name: 'Adverts',
    components: {
      Vuetable,
      VuetablePagination
    },
    data: () => {
      return {
        baseEndpoint: ApiEndpoints.getBaseApi()
      };
    },
    mounted() {
      // this.getAdverts()
      // .then(() => {
      //   this.$nextTick(() => {
      //     $('#adverts').DataTable({
      //       paging: false
      //     });
      //   });
      // });
    },
    computed: {
      ...mapGetters({
        adverts: 'adverts'
      })
    },
    methods: {
      ...mapActions([
        'getAdverts'
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

      getThumbnail(advert) {
        let id = this.pad(advert.id, 6);

        return `${ApiEndpoints.getBaseApi()}/static/items-thumbnail/${id[0]}/${id[1]}/${id[2]}/img_${advert.id}_0.jpg`;
      }
    }
  };
</script>

<style lang="scss">
/* Using the bootstrap style, but overriding the font to not draw in
   the Glyphicons Halflings font as an additional requirement for sorting icons.

   An alternative to the solution active below is to use the jquery style
   which uses images, but the color on the images does not match adminlte.

@import url('/static/js/plugins/datatables/jquery.dataTables.min.css');
*/

@import url('/static/js/plugins/datatables/dataTables.bootstrap.css');
@import '~styles/main.scss';

table.dataTable thead .sorting:after,
table.dataTable thead .sorting_asc:after,
table.dataTable thead .sorting_desc:after {
  font-family: 'FontAwesome';
}

table.dataTable thead .sorting:after {
  content: "\f0dc";
}

table.dataTable thead .sorting_asc:after {
  content: "\f0dd";
}

table.dataTable thead .sorting_desc:after {
  content: "\f0de";
}

.photo {
  width: 500px !important;

  img {
    width: 100%;
  }
}

</style>
