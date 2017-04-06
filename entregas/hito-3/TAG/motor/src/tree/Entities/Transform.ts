import * as _ from 'lodash';
import { mat4, vec3 } from 'gl-matrix';

import { Entity } from '../Entity';
import { MatrixStack } from '../MatrixStack';

export class Transform extends Entity {

  private matrix: mat4;

  constructor(id?: string) {
    super(id);
    this.matrix = mat4.create();
  }

  /**
   * Carga la identidad de la matriz.
   */
  public reset(): void {
    mat4.identity(this.matrix);
  }

  /**
   * Carga una matriz nueva.
   * @param {mat4} matrix Matriz a cargar
   */
  public loadMatrix(matrix: mat4): void {
    mat4.copy(this.matrix, matrix);
  }

  /**
   * Traspone la matriz.
   */
  public transpose(): void {
    mat4.transpose(this.matrix, this.matrix);
  }

  /**
   * Traslada la matriz.
   * @param {number} x Eje x
   * @param {number} y Eje y
   * @param {number} z Eje z
   */
  public translate(x: number, y: number, z: number): void {
    mat4.translate(this.matrix, this.matrix, vec3.fromValues(x, y, z));
  }

  /**
   * Rotar la matriz en el eje X.
   * @param {number} rad Cantidad de radianes a rotar
   */
  public rotateX(rad: number): void {
    mat4.rotateX(this.matrix, this.matrix, rad);
  }

  /**
   * Rotar la matriz en el eje Y.
   * @param {number} rad Cantidad de radianes a rotar
   */
  public rotateY(rad: number): void {
    mat4.rotateY(this.matrix, this.matrix, rad);
  }

  /**
   * Rotar la matriz en el eje Z.
   * @param {number} rad Cantidad de radianes a rotar
   */
  public rotateZ(rad: number): void {
    mat4.rotateZ(this.matrix, this.matrix, rad);
  }

  /**
   * Escala la matriz.
   * @param {number} x Eje x
   * @param {number} y Eje y
   * @param {number} z Eje z
   */
  public scale(x: number, y: number, z: number): void {
    mat4.scale(this.matrix, this.matrix, vec3.fromValues(x, y, z));
  }

  /**
   * Multiplicamos la matriz actual por la transformacion aplicada y
   * la anyadimos al stack y como actual.
   * @return {Promise<any>} [description]
   */
  public beginDraw(): Promise<any> {
    return new Promise((resolve, reject) => {
      // console.log('begin drawing', this.id); // Debug

      let result = mat4.create();

      // MatrixStack.getInstance().printActualMatrix(); // Debug

      mat4.multiply(
        result,
        MatrixStack.getInstance().getActualMatrix(),
        this.matrix
      );

      MatrixStack.getInstance().setActualMatrix(result);

      // MatrixStack.getInstance().printActualMatrix(); // Debug

      resolve(result);
    });
  }

  /**
   * Desapilamos la matriz del stack.
   * @return {Promise<any>} [description]
   */
  public endDraw(): Promise<any> {
    return new Promise((resolve, reject) => {
      // console.log('end drawing', this.id); // Debug

      MatrixStack.getInstance().pop();
      // MatrixStack.getInstance().printActualMatrix(); // Debug

      resolve();
    });
  }
}
