import { mat4, vec3, mat3 } from 'gl-matrix';

import { Utils } from './Utils';
import { MatrixStack } from '../tree/MatrixStack';

/**
 * Singleton
 */
export class Renderer {

  private static instance: Renderer;

  private matrixStack: MatrixStack = MatrixStack.getInstance();

  private canvas: HTMLCanvasElement;

  public gl: WebGLRenderingContext;
  public shaderProgram: WebGLProgram;

  public aVertexPosition: number;
  public aVertexNormal: number;
  public aTextureCoord: number;

  private uProjectionMatrix: WebGLUniformLocation;
  private uModelViewMatrix: WebGLUniformLocation;
  private uNormalMatrix: WebGLUniformLocation;

  private uSampler: WebGLUniformLocation;

  private normalMatrix: mat4 = mat4.create();

  private fragmentShader: WebGLShader;
  private vertexShader: WebGLShader;
  public shadersLoaded: boolean = false;

  public static getInstance(): Renderer {
    if (!Renderer.instance) {
      Renderer.instance = new Renderer();
    }

    return Renderer.instance;
  }

  private constructor() {}

  /**
   * Inicializa el renderer (WebGL).
   * @param {string} canvasId Id del elemento HTML canvas.
   */
  public setUpRenderer(canvasId?: string): void {
    this.canvas = <HTMLCanvasElement>document.getElementById(canvasId || 'canvas');

    this.gl = Utils.getGlContext(this.canvas);

    this.initCanvas();
    this.initShaders();
  }

  private resizeCanvas() {
    let realToCssPixels = window.devicePixelRatio,
      displayWidth = Math.floor(this.canvas.clientWidth * realToCssPixels),
      displayHeight = Math.floor(this.canvas.clientHeight * realToCssPixels);


    if (this.canvas.width !== displayWidth || this.canvas.height !== displayHeight) {
      this.canvas.width = displayWidth;
      this.canvas.height = displayHeight;
    }
  }

  /**
   * Dibuja la escena (actualmente, solo el fondo)
   */
  public drawScene(): void {
    this.resizeCanvas();
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    mat4.perspective(this.matrixStack.getProjectionMatrix(), Utils.radians(30), this.canvas.width / this.canvas.height, 0.1, 100.0);
  }

  /**
   * Dibuja el modelo en la escena.
   * @param {any} model Modelo a dibujar en la escena
   */
  public drawModel(model: any): void {
    this.setMatrixUniforms();

    this.uSampler = this.gl.getUniformLocation(this.shaderProgram, 'uSampler');

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, model.vertexBuffer);
    this.gl.vertexAttribPointer(this.aVertexPosition, 3, this.gl.FLOAT, false, 0, 0);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, model.normalBuffer);
    this.gl.vertexAttribPointer(this.aVertexNormal, 3, this.gl.FLOAT, false, 0, 0);

    if (!model.textureImage) {
      this.gl.disableVertexAttribArray(this.aTextureCoord);
    } else {
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, model.textureBuffer);
      this.gl.vertexAttribPointer(this.aTextureCoord, 2, this.gl.FLOAT, false, 0, 0);

      this.gl.activeTexture(this.gl.TEXTURE0);
      this.gl.bindTexture(this.gl.TEXTURE_2D, model.texture);
      this.gl.uniform1i(this.uSampler, 0);
    }

    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, model.indexBuffer);
    this.gl.drawElements(this.gl.TRIANGLES, model.indices.length, this.gl.UNSIGNED_SHORT, 0);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
  }

  private setMatrixUniforms(): void {
    let normalMatrix: mat4 = mat4.create();
    let mvMatrix: mat4 = mat4.create();

    mat4.multiply(mvMatrix, this.matrixStack.getViewMatrix(), this.matrixStack.getActualMatrix());

    mat4.invert(normalMatrix, this.matrixStack.getActualMatrix());
    mat4.transpose(normalMatrix, normalMatrix);

    this.gl.uniformMatrix4fv(this.uProjectionMatrix, false, this.matrixStack.getProjectionMatrix()); // Seteamos la viewProjectionMatrix
    this.gl.uniformMatrix4fv(this.uModelViewMatrix, false, this.matrixStack.getActualMatrix()); // Seteamos la camara
    this.gl.uniformMatrix4fv(this.uNormalMatrix, false, normalMatrix);
  }

  /**
   * Inicia el canvas.
   */
  public initCanvas(): void {
    this.gl.clearColor(189 / 255, 195 / 255, 199 / 255, 1.0);
    this.gl.clearDepth(1.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.depthFunc(this.gl.LEQUAL);
  }

  /**
   * Inicializa los shaders necesarios para la escena.
   */
  private initShaders(): void {
    this.getShader('phong.frag', this.gl.FRAGMENT_SHADER)
    .then((shader) => {
      this.fragmentShader = shader;
      return this.getShader('phong.vert', this.gl.VERTEX_SHADER);
    })
    .then((shader) => {
      this.vertexShader = shader;
      this.shadersLoaded = true;

      this.shaderProgram = this.gl.createProgram();

      this.gl.attachShader(this.shaderProgram, this.vertexShader);
      this.gl.attachShader(this.shaderProgram, this.fragmentShader);
      this.gl.linkProgram(this.shaderProgram);

      if (!this.gl.getProgramParameter(this.shaderProgram, this.gl.LINK_STATUS)) {
        console.error('Unable to initialize the shader program: ' + this.gl.getProgramInfoLog(this.shaderProgram));
      }

      this.gl.useProgram(this.shaderProgram);

      this.aVertexPosition = this.gl.getAttribLocation(this.shaderProgram, 'aVertexPosition');
      this.gl.enableVertexAttribArray(this.aVertexPosition);

      this.aVertexNormal = this.gl.getAttribLocation(this.shaderProgram, 'aVertexNormal');
      this.gl.enableVertexAttribArray(this.aVertexNormal);

      this.aTextureCoord = this.gl.getAttribLocation(this.shaderProgram, 'aTextureCoord');
      this.gl.enableVertexAttribArray(this.aTextureCoord);

      this.uProjectionMatrix = this.gl.getUniformLocation(this.shaderProgram, 'uPMatrix');
      this.uModelViewMatrix = this.gl.getUniformLocation(this.shaderProgram, 'uMVMatrix');
      this.uNormalMatrix = this.gl.getUniformLocation(this.shaderProgram, 'uNormalMatrix');
    });
  }

  /**
   * Obtiene un shader y lo enlaca con el programa.
   * @param {string} scriptId id del shader en el index.html
   * @param {number} type Tipo de shader
   * @return {WebGLShader} Shader
   */
  private getShader(path: string, type: number): Promise<WebGLShader> {
    return Utils.loadFile(`../shaders/${path}`)
    .then((shaderSource) => {
        let shader: WebGLShader;

        shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, shaderSource);
        this.gl.compileShader(shader);

        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
          console.error('An error occured compiling the shaders: ' + this.gl.getShaderInfoLog(shader) + ' ' + path);
          this.gl.deleteShader(shader);
          return null;
        }

        return shader;
    });
  }
}
