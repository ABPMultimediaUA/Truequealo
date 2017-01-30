var c_width = 1000,
  c_height = 1000,
  isModelLoaded = false,
  mvMatrix = mat4.create(),
  pMatrix = mat4.create(),
  gl, // Objeto WebGL
  model, // Modelo
  generatedColors = [],
  cubeVerticesColorBuffer,
  modelVertexBuffer, // Buffer de vertices para el modelo
  modelIndexBuffer; // Buffer de indices para el modelo


/**
 * Carga del modelo llamando al loader.
 */
function loadModel() {
  Loader.loadFile(window.location.href + 'src/models/square.json', function(modelLoaded) {
    model = modelLoaded;

    modelVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, modelVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(model.vertices), gl.STATIC_DRAW);


    modelIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, modelIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(model.indices), gl.STATIC_DRAW);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    gl.uniform3f(prg.modelColor, model.colors[0][0], model.colors[0][1], model.colors[0][2]);

    isModelLoaded = true;
  });
}

/**
 * Dibuja la escena
 */
function drawScene() {

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.viewport(0, 0, c_width, c_height);

  mat4.perspective(90, c_width / c_height, 0.1, 100.0, pMatrix);
  mat4.identity(mvMatrix);
  mat4.translate(mvMatrix, [0.0, 0.0, -5.0]);

  mat4.rotate(mvMatrix, 30 * Math.PI /180, [1,0,0]);
  mat4.rotate(mvMatrix, 30 * Math.PI /180, [0,1,0]);

  gl.uniformMatrix4fv(prg.pMatrixUniform, false, pMatrix);
  gl.uniformMatrix4fv(prg.mvMatrixUniform, false, mvMatrix);

  gl.enableVertexAttribArray(prg.vertexPositionAttribute);

  if (!isModelLoaded) return;

  gl.bindBuffer(gl.ARRAY_BUFFER, modelVertexBuffer);
  gl.vertexAttribPointer(prg.aVertexPosition, 3, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, modelIndexBuffer);
  gl.drawElements(gl.TRIANGLES, model.indices.length, gl.UNSIGNED_SHORT, 0);
}

/**
 * Bucle principal. Cada iteracion llama a requestAnimFrame que volvera a llamar
 * a la misma funcion cada frame.
 *
 * Tambien llama al pintado de la escena.
 */
function renderLoop() {
  Utils.requestAnimFrame(renderLoop);
  drawScene();
}

/**
 * Limpia la escena
 * @param {Object} ctx Contexto
 */
function clear(ctx) {
  ctx.clear(ctx.COLOR_BUFFER_BIT);
  ctx.viewport(0, 0, c_width, c_height);
}

/**
 * Inicializa el programa
 */
function init() {
  var fgShader = Utils.getShader(gl, 'shader-fs');
  var vxShader = Utils.getShader(gl, 'shader-vs');

  prg = gl.createProgram();
  gl.attachShader(prg, vxShader);
  gl.attachShader(prg, fgShader);
  gl.linkProgram(prg);

  if (!gl.getProgramParameter(prg, gl.LINK_STATUS)) {
    alert('Could not initialise shaders');
  }

  gl.useProgram(prg);

  prg.vertexPositionAttribute = gl.getAttribLocation(prg, 'aVertexPosition');
  prg.pMatrixUniform = gl.getUniformLocation(prg, 'uPMatrix');
  prg.mvMatrixUniform = gl.getUniformLocation(prg, 'uMVMatrix');
  prg.modelColor = gl.getUniformLocation(prg, 'modelColor');
}

/**
 * Punto inicial de la aplicacion.
 */
function bootstrapApp() {
  gl = Utils.getGLContext('canvas-element-id');
  init();
  loadModel();
  renderLoop();
}
