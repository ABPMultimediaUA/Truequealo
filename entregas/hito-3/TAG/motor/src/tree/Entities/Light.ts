import { Entity } from '../Entity';
import { MotorLoop, Renderer } from '../../lib';
import { MatrixStack } from '../MatrixStack';
import { mat4, vec3, mat3 } from 'gl-matrix';

import * as _ from 'lodash';

export class Light extends Entity {
  private renderer: Renderer = Renderer.getInstance();

  private gl: WebGLRenderingContext = this.renderer.gl;

  private matrixStack: MatrixStack = MatrixStack.getInstance();

  private active: boolean;

  private loaded: boolean = false;

  private directionalLight: boolean = true;

  private uAmbientLight: WebGLUniformLocation;
  private uDirectionalLightColor: WebGLUniformLocation;
  private uDirectionalVector: WebGLUniformLocation;

  private ambientLightColor: Array<number> = [150 / 255, 150 / 255, 150 / 255, 255 / 255];
  private diffuseLightColor: Array<number> = [30 / 255, 30 / 255, 30 / 255];
  private diffuseSpecular: Array<number> = [30 / 255, 30 / 255, 30 / 255];
  private directionalLightColor: Array<number> = [150 / 255, 150 / 255, 150 / 255];
  private directionalVector: vec3 = vec3.create();

  private uLight: WebGLUniformLocation;

  private locations: any = {
    uLightPosition: null,
    uLightAmbient: null,
    uLightDiffuse: null,
    uLightSpecular: null
  };

  constructor(directional: boolean, id?: string) {
    super(id);
    this.directionalLight = directional;
  }

  private init() {
    this.directionalLight && this.setLight();
    this.loaded = true;
  }

  /**
   * Si la luz es direccional obtenemos los uniforms adecuados.
   */
  private setLight(): void {
    // Luces
    // this.uAmbientLight = this.gl.getUniformLocation(this.renderer.shaderProgram, 'uAmbientLight');
    // this.uDirectionalLightColor = this.gl.getUniformLocation(this.renderer.shaderProgram, 'uDirectionalLightColor');
    // this.uDirectionalVector = this.gl.getUniformLocation(this.renderer.shaderProgram, 'uDirectionalVector');

    _.forEach(this.locations, (location: any, key: string) => {
      this.locations[key] = this.gl.getUniformLocation(this.renderer.shaderProgram, `uLight.${key}`);
    });
  }

  /**
   * Metodo para dibujar una luz direccional.
   */
  private drawDirectionalLight(): void {
    mat4.getTranslation(this.directionalVector, this.matrixStack.getActualMatrix());

    this.gl.uniform4fv(this.locations.uLightAmbient, [0.3, 0.3, 0.3, 1.0]);
    this.gl.uniform4fv(this.locations.uLightDiffuse, [0.7, 0.7, 0.7, 1.0]);
    this.gl.uniform4fv(this.locations.uLightSpecular, [0.7, 0.7, 0.7, 1.0]);
    this.gl.uniform3fv(this.locations.uLightPosition, this.directionalVector);
  }

  /**
   * Cambiar el color de la luz.
   * @param {number} r rojo
   * @param {number} g verde
   * @param {number} b azul
   */
  public setDirectionalColor(r: number, g: number, b: number): void {
    this.directionalLightColor[0] = r || 0;
    this.directionalLightColor[1] = g || 0;
    this.directionalLightColor[2] = b || 0;
  }

  public beginDraw(): Promise<any> {
    return new Promise((resolve, reject) => {
      // console.log('begin drawing');
      if (MotorLoop.iteration === 1 && this.renderer.shadersLoaded) {
        // console.log('drawing light');

        !this.loaded && this.init();
        this.directionalLight && this.drawDirectionalLight();
      }
      resolve();
    });
  }

  public endDraw(): Promise<any> {
    return new Promise((resolve, reject) => {
      // console.log('end drawing');
      resolve();
    });
  }
}
