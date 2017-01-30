var Utils = {

  /**
   * Obtiene el contexto webgl para el elemento pasado como parametro.
   * @param {String} name - id del elemento canvas.
   * @return {Object} devuelve el contexto del canvas.
   */
  getGLContext: function(name) {

    var canvas = document.getElementById(name);
    var ctx = null;

    if (canvas == null) {
      alert('there is no canvas on this page');
      return null;
    } else {
      c_width = canvas.width;
      c_height = canvas.height;
    }

    var names = ['webgl', 'experimental-webgl', 'webkit-3d', 'moz-webgl'];

    for (var i = 0; i < names.length; ++i) {
      try {
        ctx = canvas.getContext(names[i]);
      } catch (e) {}
      if (ctx) {
        break;
      }
    }
    if (ctx == null) {
      alert('Could not initialise WebGL');
      return null;
    } else {
      return ctx;
    }
  },

  /**
   * Obtiene los shaders para WebGL.
   * @param {Object} gl Objeto WebGL.
   * @param {String} id id del elemento html que contiene el shader.
   * @return {Object} Objeto shader.
   */
  getShader: function(gl, id) {
    var script = document.getElementById(id);
    if (!script) {
      return null;
    }

    var str = '';
    var k = script.firstChild;
    while (k) {
      if (k.nodeType == 3) {
        str += k.textContent;
      }
      k = k.nextSibling;
    }

    var shader;
    if (script.type == 'x-shader/x-fragment') {
      shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (script.type == 'x-shader/x-vertex') {
      shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
      return null;
    }

    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert(gl.getShaderInfoLog(shader));
      return null;
    }
    return shader;
  },

  /**
   * Devuelve la funcion requestAnimationFrame
   * @param {Function} callback Callback, funcion que se ejecuta en cada ciclo.
   * @return {Function} requestAnimationFrame.
   */
  requestAnimFrame: function(callback) {
    return window.requestAnimationFrame(callback) ||
      window.webkitRequestAnimationFrame(callback) ||
      window.mozRequestAnimationFrame(callback) ||
      window.oRequestAnimationFrame(callback) ||
      window.msRequestAnimationFrame(callback) ||
      function(callback, element) {
        window.setTimeout(callback, 1000 / 60);
      };
  }
}
