import ENV from '../config/env';
import { ApiClient } from './generated/generate-api';
const ApiClientSingleton = (function () {
  var instance;
  const apiNoAuth = [];

  function createInstance() {
    var object = new ApiClient(ENV.SERVER_URL);
    object.applyAuthToRequest = (request, authNames) => {
      if (!apiNoAuth.includes(subString(request.url))) {
        request.set({ Authorization: 'Bearer ' + localStorage.getItem('token') });
      }
    };
    return object;
  }

  function subString(url) {
    return url.substring(ENV.SERVER_URL.length, url.length);
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

export default ApiClientSingleton;
