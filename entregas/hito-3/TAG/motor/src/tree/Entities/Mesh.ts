import { Entity } from '../Entity';

import { mat4, vec3 } from 'gl-matrix';
import * as _ from 'lodash';

import { ResourceManager } from '../../resource-manager/ResourceManager';
import { MeshResource } from '../../resource-manager/types';
import { MatrixStack } from '../MatrixStack';

import { MotorLoop, Renderer } from '../../lib';

export class Mesh extends Entity {

  private mesh: MeshResource;
  private path: string;
  private texturePath: string;
  private resourceManager: ResourceManager = ResourceManager.getInstance();
  private renderer: Renderer = Renderer.getInstance();
  private nOfModels: number;

  public active: boolean = true;

  constructor(path: string, texturePath?: string, nOfModels?: number, id?: string) {
    super(id);
    this.path = path;
    this.texturePath = texturePath;
    this.nOfModels = nOfModels || 1;
  }

  /**
   * Pide el recurso, una vez que lo tiene llama al dibujado del metodo.
   * @return {Promise<any>} [description]
   */
  public beginDraw(): Promise<any> {
    return new Promise((resolve, reject) => {
      // console.log('begin drawing', this.id);

      if (this.active && MotorLoop.iteration === 2 && this.mesh) {
        this.mesh.draw();
      } else if (this.renderer.shadersLoaded) {
        this.resourceManager.getResource(this.path, 'mesh', this.texturePath, this.nOfModels)
        .then((mesh: MeshResource) => {
          this.mesh = mesh;
        });
      }
      resolve();
    });
  }

  public endDraw(): Promise<any> {
    return new Promise((resolve, reject) => {
      // console.log('end drawing', this.id);
      resolve();
    });
  }
}
