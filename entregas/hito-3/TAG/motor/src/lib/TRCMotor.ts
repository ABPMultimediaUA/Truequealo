import { Node, Entity, Camera, Light, Mesh, Transform, MatrixStack } from '../tree';

import { Renderer, MotorLoop, Utils } from './index';

export class TRCElement {
  public node: Node;
  public father: Node;
  public entity: Entity;
  public transform: Transform;

  constructor() {}

  public translate(x: number, y: number, z: number) {
    this.transform.translate(x, y, z);
  }

  public rotateX(rot: number) {
    this.transform.rotateX(rot);
  }

  public rotateY(rot: number) {
    this.transform.rotateY(rot);
  }

  public rotateZ(rot: number) {
    this.transform.rotateZ(rot);
  }
}

export class TRCMotor {
  private static scene: Node;

  public static start() {
    Renderer.getInstance().setUpRenderer();
    MotorLoop.runLoop();
  }

  private static createNode(entity?: Entity, father?: Node, id?: string): Node {
    let node = new Node(entity, father, id);

    if (father) {
      father.addChild(node);
    }

    return node;
  }

  /**
   * Crea el nodo root de la escena.
   * @param {string} id Id de la escena.
   * @return {Node}
   */
  public static createScene(id?: string): Node {
    TRCMotor.scene = TRCMotor.createNode(null, null, id);

    MotorLoop.setRootNode(TRCMotor.scene);

    return TRCMotor.scene;
  }

  /**
   * Crea una entidad transformacion.
   * @param {Node} father Padre asociado
   * @param {string} id
   * @return {Node}
   */
  public static createTransform(father?: Node, id?: string): Node {
    let transform = new Transform(id);

    return TRCMotor.createNode(transform, father || TRCMotor.scene, id);
  }

  /**
   * Crea una malla en la escena
   * @param {string} path URL del fichero a cargar.
   * @param {string} texturePath ruta de la textura
   * @param {Node} father Padre asociado
   * @param {string} id
   * @return {Node}
   */
  public static createMesh(path: string, texturePath?: string, father?: Node, nOfAnimations?: number, id?: string): Node {
    let mesh = new Mesh(path, texturePath, nOfAnimations, id);

    return TRCMotor.createNode(mesh, father || TRCMotor.scene, id);
  }

  /**
   * Crea una camara.
   * @param {Node} father Padre asociado
   * @param {string} id
   * @return {Node}
   */
  public static createCamera(father?: Node, id?: string): Node {
    let camera = new Camera(id);

    return TRCMotor.createNode(camera, father || TRCMotor.scene, id);
  }

  /**
   * Crea una luz.
   * @param {boolean} directional luz direccional o no
   * @param {Node} father Padre asociado
   * @param {string} id
   * @return {Node}
   */
  public static createLight(directional?: boolean, father?: Node, id?: string): Node {
    let light = new Light(directional, id);

    return TRCMotor.createNode(light, father || TRCMotor.scene, id);
  }

  /**
   * Devuelve la entidad Light del nodo.
   * @param {Node} node [description]
   * @return {Light} [description]
   */
  public static getLightFromNode(node: Node): Light {
    return <Light>node.entity;
  }

  /**
   * Devuelve la entidad Transform del nodo.
   * @param {Node} node
   * @return {Transform}
   */
  public static getTransformFromNode(node: Node): Transform {
    return <Transform>node.entity;
  }

  /**
   * Devuelve la entidad Mesh del nodo.
   * @param {Node} node
   * @return {Transform}
   */
  public static getMeshFromNode(node: Node): Mesh {
    return <Mesh>node.entity;
  }
}
