<template>
  <section class="content">
    <div class="row center-block">
      <div class="col-md-12">
        <div class="box">
          <!-- /.box-header -->
          <div class="box-body">
            <div class="dataTables_wrapper form-inline dt-bootstrap" id="users_wrapper">
              <div class="row">
                <div class="col-sm-12 table-responsive">
                  <table aria-describedby="users_info" role="grid" id="users" class="table table-bordered table-striped dataTable">
                    <thead>
                      <tr role="row">
                        <th></th>
                        <th aria-label="Correo: activate to sort column descending" aria-sort="ascending"
                          style="width: 167px;" colspan="1" rowspan="1" aria-controls="users" tabindex="0" class="sorting_asc">Correo</th>
                        <th aria-label="Nombre: activate to sort column ascending"
                          style="width: 207px;" colspan="1" rowspan="1" aria-controls="users" tabindex="0" class="sorting">Nombre</th>
                        <th aria-label="Anuncios: activate to sort column ascending"
                          style="width: 182px;" colspan="1" rowspan="1" aria-controls="users" tabindex="0" class="sorting">Anuncios</th>
                        <th aria-label="Valoración: activate to sort column ascending"
                          style="width: 142px;" colspan="1" rowspan="1" aria-controls="users" tabindex="0" class="sorting">Valoración</th>
                        <th aria-label="Ubicación: activate to sort column ascending"
                          style="width: 101px;" colspan="1" rowspan="1" aria-controls="users" tabindex="0" class="sorting">Ubicación</th>
                        <th aria-label="Activo: activate to sort column ascending"
                          style="width: 101px;" colspan="1" rowspan="1" aria-controls="users" tabindex="0" class="sorting">Activo</th>
                        <th aria-label="Social: activate to sort column ascending"
                          style="width: 101px;" colspan="1" rowspan="1" aria-controls="users" tabindex="0" class="sorting">Social</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr role="row" v-if="users" v-for="user in users">
                        <td class="user-photo" v-if="!user.photoSocial"><img v-if="user.photo" :src="getThumbnail(user)"></td>
                        <td class="user-photo" v-else><img v-if="user.photoSocial" :src="`${user.photoSocial}`"></td>
                        <td class="sorting_1">{{user.email}}</td>
                        <td>{{user.name}} {{user.surname}}</td>
                        <td>{{user.adverts.length}}</td>
                        <td>10</td>
                        <td>{{user.locality}}, {{user.province}}, {{user.postal_code}}</td>
                        <td v-if="!user.active"><span class="btn btn-success btn-xs" v-on:click="toggleUserActive(user, true)">Activar</span></td>
                        <td v-else><span class="btn btn-warning btn-xs" v-on:click="toggleUserActive(user, false)">Desactivar</span></td>
                        <td>{{user.social}}</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <th></th>
                        <th colspan="1" rowspan="1">Correo</th>
                        <th colspan="1" rowspan="1">Nombre</th>
                        <th colspan="1" rowspan="1">Anuncios</th>
                        <th colspan="1" rowspan="1">Valoración</th>
                        <th colspan="1" rowspan="1">Ubicación</th>
                        <th colspan="1" rowspan="1">Activo</th>
                        <th colspan="1" rowspan="1">Social</th>
                      </tr>
                    </tfoot>
                  </table>
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
  import $ from 'jquery';
  import { mapGetters, mapActions } from 'vuex';
  import { ApiEndpoints } from '../../config';
  import { cloneDeep, noop } from 'lodash';

  // Require needed datatables modules
  import 'datatables.net';
  import 'datatables.net-bs';

  export default {
    name: 'Users',
    data: () => {
      return {
        baseEndpoint: ApiEndpoints.getBaseApi()
      };
    },
    mounted() {
      this.getUsers()
      .then(() => {
        this.$nextTick(() => {
          $('#users').DataTable();
        });
      });
    },
    computed: {
      ...mapGetters({
        users: 'users'
      })
    },
    methods: {
      ...mapActions([
        'getUsers', 'updateUser'
      ]),

      toggleUserActive(user, newState) {
        user.active = newState;

        let userToUpdate = cloneDeep(user);

        userToUpdate.photos = noop();
        userToUpdate.adverts = noop();
        userToUpdate.created_at = noop();
        userToUpdate.updatedAt = noop();
        userToUpdate.reviewsReceived = noop();

        this.updateUser(userToUpdate);
      },

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

      getThumbnail(user) {
        let id = this.pad(user.id, 6);

        return `${ApiEndpoints.getBaseApi()}/static/users-thumbnail/${id[0]}/${id[1]}/${id[2]}/img_${user.id}.jpg`;
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

.user-photo {
  width: 30px;

  img {
    width: 100%;
  }
}

</style>
