import { Resource } from '../Resource';
import { Renderer, Utils, MotorLoop } from '../../lib';

const OBJ = require('webgl-obj-loader');
const MTL = new (require('obj-mtl-loader'));
const parser = require('obj-json-parser');

const shaderConfig = require('../../shaders/config.json');

const mapSeries = require('promise-map-series');

import * as _ from 'lodash';

export class MeshResource extends Resource {
  private renderer: Renderer = Renderer.getInstance();

  private gl: WebGLRenderingContext = this.renderer.gl;

  private model: any = {};

  private models: Array<any> = [];

  private nOfModels: number;

  private texturePath: string;

  private materialLocations: any = {};

  private meshConfig = shaderConfig.phong.mesh;

  private iteration: number = 0;

  constructor(id: string, texturePath?: string, nOfModels?: number) {
    super(id);

    this.texturePath = texturePath;
    this.nOfModels = nOfModels || 1;

    _.forEach(this.meshConfig.locations, (key: string) => {
      this.materialLocations[key] = this.gl.getUniformLocation(this.renderer.shaderProgram, key);
    });
  }

  public loadModel(index: number): Promise<any> {
    return new Promise((resolve, reject) => {
      return Utils.loadFile(`../../assets/models/${this.id}/${this.id}_${index}.obj`)
        .then((file) => {
          return Utils.loadFile(`../../assets/models/${this.id}/${this.id}_${index}.mtl`)
            .then((mtl) => {
              let model = new OBJ.Mesh(file);
              model.material = Utils.parseMtl(mtl);

              OBJ.initMeshBuffers(this.gl, model);

              if (this.texturePath && this.meshConfig.texture) {

                model.texture = this.gl.createTexture();

                model.textureImage = new Image();
                model.textureImage.onload = () => {
                  this.gl.bindTexture(this.gl.TEXTURE_2D, model.texture);
                  this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, model.textureImage);
                  this.gl.generateMipmap(this.gl.TEXTURE_2D);
                  this.gl.bindTexture(this.gl.TEXTURE_2D, null);

                  this.models.push(model);
                  resolve(model);
                };

                model.textureImage.src = `../../assets/models/${this.id}/${this.texturePath}`;

              } else {
                this.models.push(model);
                resolve(model);
              }
            });
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }

  /**
   * Llama a la funcion para cargar un archivo, una vez cargado carga los buffers
   * y resuelve la promesa.
   * @return {Promise<any>}
   */
  public loadFile(): Promise<any> {
    let promises: any = [],
      modelIndex: Array<any> = _.range(this.nOfModels);

    return mapSeries(modelIndex, (index: number) => {
        return this.loadModel(index);
    })
    .then((models: any) => {
      this.loaded = true;

      return models;
    });
  }

  /**
   * Llama al metodo del renderer para dibujar el modelo pasado como parametro.
   */
  public draw(): void {
    if (this.loaded) {
      // console.log('drawing mesh', this.id, this.loaded);
      if (MotorLoop.frameCount > MotorLoop.frameTick - 1) {
        this.iteration++;
        if (this.iteration >= this.nOfModels) {
          this.iteration = 0;
        }
      }

      if (this.models[this.iteration].material && this.meshConfig.modelMaterials) {
        this.meshConfig.modelMaterials.forEach((material: any, index: number) => {
          if (material.type === 'uniform4fv')  {
            this.renderer.gl.uniform4fv(this.materialLocations[this.meshConfig.locations[index]], _.concat(this.models[this.iteration].material[material.name], 0));
          } else if (material.type === 'uniform1f') {
            this.renderer.gl.uniform1f(this.materialLocations[this.meshConfig.locations[index]], this.models[this.iteration].material[material.name]);
          }
        });
      }

      this.renderer.drawModel(this.models[this.iteration]);
    }
  }
}
