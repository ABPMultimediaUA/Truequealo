import axios from 'axios';
import { ApiEndpoints } from '../config';

export default {
  request(method, endpoint, data = null, params, id) {
    if (!method) {
      console.error('API function call requires method argument');
      return -1;
    }

    if (!endpoint) {
      console.error('API function call requires endpoint argument');
      return -1;
    }

    let headers = {
      'Cache-Control': 'no-cache'
    };

    let url = this.configureUrl(endpoint, id);

    return axios({ method, url, data, params, headers });
  },

  authRequest(method, endpoint, data = null, params, id) {
    if (!method) {
      console.error('API function call requires method argument');
      return -1;
    }

    if (!endpoint) {
      console.error('API function call requires endpoint argument');
      return -1;
    }

    let url = this.configureUrl(endpoint, id);
    let headers = {
      'Authorization': window.sessionStorage.getItem('token'),
      'Cache-Control': 'no-cache'
    };

    return axios({ method, url, data, params, headers });
  },

  configureUrl(endpoint, id) {
    let url = `${ApiEndpoints.getBaseApi()}${ApiEndpoints[endpoint]}`;

    url = id ? `${url}/${id}` : url;

    return url;
  }
};
