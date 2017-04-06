import { Entity } from '../Entity';

import { MatrixStack } from '../MatrixStack';
import { MotorLoop } from '../../lib';

import { mat4 } from 'gl-matrix';

export class Camera extends Entity {
  private active: boolean;

  constructor(id?: string) {
    super(id);
  }

  public beginDraw(): Promise<any> {
    return new Promise((resolve, reject) => {
      // console.log('begin drawing', this.id);

      if (MotorLoop.iteration === 0) {
        MatrixStack.getInstance().setActualAsViewMatrix();
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
