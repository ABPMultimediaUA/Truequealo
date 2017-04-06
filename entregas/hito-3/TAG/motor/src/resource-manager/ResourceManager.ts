import { Resource } from './Resource';
import { MeshResource } from './types';

import * as _ from 'lodash';

/**
 * Singleton
 */
export class ResourceManager {
  private static instance: ResourceManager;

  private resources: Array<Resource> = [];

  private constructor() {}

  public static getInstance(): ResourceManager {
    if (!ResourceManager.instance) {
      ResourceManager.instance = new ResourceManager();
    }

    return ResourceManager.instance;
  }

  /**
   * Obtiene un recurso. Si esta disponible lo devuelve, si no, crea uno nuevo.
   * @param {string} path Url del recurso.
   * @param {string} resourceType Tipo de recurso (mesh, light, etc).
   * @param {string} texturePath ruta de la textura
   * @return {Promise<Resource>} Promesa
   */
  public getResource(path: string, resourceType: string, texturePath?: string, nOfModels?: number): Promise<Resource> {
    return new Promise((resolve, reject) => {
      let resourceToFind = _.find(this.resources, (resource) => {
        return resource.id === path;
      });

      if (!resourceToFind) {
        resourceToFind = this.createNewResourceType(path, resourceType, texturePath, nOfModels);
        this.resources.push(resourceToFind);

        resourceToFind.loadFile()
        .then((data) => {
          resolve(resourceToFind);
        });
      } else if (!resourceToFind.loaded) {
        resolve(resourceToFind);
      }
    });
  }

  /**
   * Crea un nuevo recurso del tipo especificado.
   * @param {string} path Url del recurso.
   * @param {string} resourceType Tipo de recurso (mesh, light, etc).
   * @param {string} texturePath ruta de la textura
   * @return {Promise<Resource>} Promesa
   */
  private createNewResourceType(path: string, resourceType: string, texturePath?: string, nOfModels?: number): Resource {
    switch (resourceType) {
      case 'mesh': return new MeshResource(path, texturePath, nOfModels);
      default: return null;
    }
  }
}
