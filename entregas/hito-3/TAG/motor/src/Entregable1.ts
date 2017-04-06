import { Node } from './tree/Node';

import { Camera, Transform, Mesh } from './tree/Entities/index';

import { MotorLoop, Utils, TRCMotor, Controls, Application } from './lib';

export class Entregable1 extends Application {
  private deerTransform = TRCMotor.createTransform(this.scene, 'deerTransf');
  private deerMesh = TRCMotor.createMesh('deer', 'deer.png', this.deerTransform, 1, 'deer');

  private squareTransform = TRCMotor.createTransform(this.scene, 'squareTransf');
  private squareMesh = TRCMotor.createMesh('square', 'square.png', this.squareTransform, 1, 'square');

  private vaseTransform = TRCMotor.createTransform(this.scene, 'vaseTransf');
  private vaseMesh = TRCMotor.createMesh('vase', 'vase.png', this.vaseTransform, 1, 'vase');

  private foxTransform = TRCMotor.createTransform(this.scene, 'foxTransf');
  private foxMesh = TRCMotor.createMesh('fox', 'fox.png', this.foxTransform, 6, 'fox');

  constructor() {
    super();

    TRCMotor.getMeshFromNode(this.planeMesh).active = false;
    TRCMotor.getMeshFromNode(this.foxMesh).active = false;
    TRCMotor.getMeshFromNode(this.squareMesh).active = false;
    TRCMotor.getMeshFromNode(this.vaseMesh).active = false;

    TRCMotor.getTransformFromNode(this.squareTransform).translate(3, 0, 0);
    TRCMotor.getTransformFromNode(this.vaseTransform).translate(-3, 0, 0);

    Controls.addKeyboardWASDControls(TRCMotor.getTransformFromNode(this.deerTransform));

    this.animation();
  }

  public setFoxAnimation() {
    TRCMotor.getMeshFromNode(this.foxMesh).active = true;

    TRCMotor.getMeshFromNode(this.deerMesh).active = false;
    TRCMotor.getMeshFromNode(this.squareMesh).active = false;
    TRCMotor.getMeshFromNode(this.vaseMesh).active = false;
  }

  public setTexturas() {
    TRCMotor.getMeshFromNode(this.squareMesh).active = true;
    TRCMotor.getMeshFromNode(this.vaseMesh).active = true;

    TRCMotor.getMeshFromNode(this.deerMesh).active = false;
    TRCMotor.getMeshFromNode(this.foxMesh).active = false;
  }

  public setDeer() {
    TRCMotor.getMeshFromNode(this.deerMesh).active = true;

    TRCMotor.getMeshFromNode(this.squareMesh).active = false;
    TRCMotor.getMeshFromNode(this.vaseMesh).active = false;
    TRCMotor.getMeshFromNode(this.foxMesh).active = false;
  }

  public animation() {

    TRCMotor.getTransformFromNode(this.deerTransform).rotateY(0.005);
    TRCMotor.getTransformFromNode(this.foxTransform).rotateY(0.005);
    TRCMotor.getTransformFromNode(this.vaseTransform).rotateY(0.005);
    TRCMotor.getTransformFromNode(this.squareTransform).rotateY(0.005);
    Utils.requestAnimFrame(this.animation.bind(this));
  }
}
