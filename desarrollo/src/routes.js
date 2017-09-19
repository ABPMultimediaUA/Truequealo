import DashView from './views/Dash.vue';
import LoginView from './views/Login.vue';
import NotFoundView from './views/404.vue';

// Import Views - Dash
import DashboardView from './views/pages/Dashboard.vue';
import UsersView from './views/pages/Users.vue';
import AdvertsOnReviewView from './views/pages/AdvertsOnReview.vue';
import SettingView from './views/pages/Setting.vue';
import AdvertsView from './views/pages/Adverts.vue';
import AdvertView from './views/pages/Advert.vue';
import AccessView from './views/pages/Access.vue';
import ServerView from './views/pages/Server.vue';

// Routes
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/',
    component: DashView,
    children: [
      {
        path: 'dashboard',
        alias: '',
        icon: 'desktop',
        component: DashboardView,
        name: 'Dashboard',
        meta: {description: 'Overview of environment'}
      }, {
        path: '',
        icon: 'user',
        component: UsersView,
        name: 'Usuarios',
        meta: {description: ''}
      }, {
        path: 'onreview',
        icon: 'archive',
        component: AdvertsOnReviewView,
        name: 'En revisión',
        meta: {description: 'Anuncios pendientes de revisión'}
      }, {
        path: 'adverts',
        icon: 'handshake-o',
        component: AdvertsView,
        name: 'Anuncios',
        meta: {description: ''}
      }, {
        path: 'advert/:id',
        component: AdvertView,
        name: 'Anuncio',
        props: true,
        meta: {description: ''}
      }, {
        path: 'setting',
        icon: 'cog',
        component: SettingView,
        name: 'Settings',
        meta: {description: 'User settings page'}
      }, {
        path: 'access',
        icon: 'book',
        component: AccessView,
        name: 'Access',
        meta: {description: 'Example of using maps'}
      }, {
        path: 'server',
        icon: 'hdd-o',
        component: ServerView,
        name: 'Servers',
        meta: {description: 'List of our servers'}
      }
    ]
  }, {

    // not found handler
    path: '*',
    component: NotFoundView
  }
];

export default routes;
