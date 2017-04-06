import { Node } from '../tree/Node';

import { Camera, Transform, Mesh } from '../tree/Entities';

import { MotorLoop, Utils, TRCMotor, Controls } from './';

declare var dat: any;

export class Application {
  public scene: Node = TRCMotor.createScene('escena');

  public camRotationTransfX: Node = TRCMotor.createTransform(this.scene, 'cameraRotTransfX');
  public camRotationTransfY: Node = TRCMotor.createTransform(this.camRotationTransfX, 'cameraRotTransfY');
  public camTranslationTransf: Node = TRCMotor.createTransform(this.camRotationTransfY, 'cameraTransTransf');
  public camera: Node = TRCMotor.createCamera(this.camTranslationTransf, 'camera');

  public camRotationX: Transform = TRCMotor.getTransformFromNode(this.camRotationTransfX);
  public camRotationY: Transform = TRCMotor.getTransformFromNode(this.camRotationTransfY);
  public camTranslation: Transform = TRCMotor.getTransformFromNode(this.camTranslationTransf);

  public planeTransform: Node = TRCMotor.createTransform(this.scene, 'planeTransf');
  public planeMesh: Node = TRCMotor.createMesh('plane', 'plane.png', this.planeTransform, 1, 'plane');

  public lightTr: Node;
  public light: Node;

  public lightTransformEntity: Transform;

  constructor() {
    TRCMotor.start();
    this.lightTr = TRCMotor.createTransform(this.scene, 'lightTr');
    this.light = TRCMotor.createLight(true, this.lightTr, 'light');

    this.lightTransformEntity = TRCMotor.getTransformFromNode(this.lightTr);

    this.lightTransformEntity.translate(0, 5, 3);
    this.camTranslation.translate(0, 0, -Controls.initialTranslation);

    this.addInputHandlers();
  }

  public setUpGui() {
    let gui = new dat.GUI();

    gui.add(this, 'translation', -100, 0);
  }

  public addInputHandlers() {
    Controls.addCameraControls(this.camTranslation, this.camRotationX, this.camRotationY);
  }

  /**
   * Animaciones de movimiento
   */
  public animation() {
    Utils.requestAnimFrame(this.animation.bind(this));
  }
}
