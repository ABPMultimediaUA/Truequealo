var Loader = {
  /**
   * Lanza peticion GET sobre AJAX y devuelve el objeto parseado.
   * @param {String} path - url del Objeto
   * @param {Function} callback - callback
   */
  loadFile: function(path, callback) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState === 4 && request.status === 200) {
        callback(JSON.parse(request.responseText));
      }
    }

    request.open('GET', path, true);
    request.send();
  }
}
