import { Utils } from './';

import { Transform } from '../tree/entities';

export class Controls {
  public static gradTheta: number = 270; // Rotacion plana
  public static gradPhi: number = 0; // Rotacion vertical

  public static initialTranslation: number = 20;

  public static addCameraControls(cameraTranslation: Transform, cameraRotationX: Transform, cameraRotationY: Transform) {
    let mouseDown: boolean = false,
      lastMouseX: number = 0,
      lastMouseY: number = 0;

    let handleMouseDown = (event: any) => {
      mouseDown = true;

      lastMouseX = event.clientX;
      lastMouseY = event.clientY;
    };

    let handleMouseUp = (event: any) => {
      mouseDown = false;
    };

    let handleMouseMove = (event: any) => {
      let newX = event.clientX;
      let newY = event.clientY;
      let position;

      if (!mouseDown) {
        return;
      }

      let deltaX = (newX - lastMouseX),
        deltaY = (newY - lastMouseY);

      cameraRotationX.reset();
      cameraRotationY.reset();
      cameraTranslation.reset();

      position = Controls.calcPositionCamera(deltaX, deltaY);

      cameraTranslation.translate(position.x, position.y, position.z);
      cameraRotationY.rotateX(Utils.radians(Controls.gradPhi));
      cameraRotationX.rotateY(Utils.radians(Controls.gradTheta + 90));

      lastMouseX = newX;
      lastMouseY = newY;
    };

    document.getElementById('canvas').addEventListener('mousemove', handleMouseMove);
    document.getElementById('canvas').addEventListener('mousedown', handleMouseDown);
    document.getElementById('canvas').addEventListener('mouseup', handleMouseUp);
  }

  public static calcGradTheta(increment: number) {
    if ((this.gradTheta + increment) > 360) {
      this.gradTheta = (this.gradTheta + increment) - 360;
    } else if ((this.gradTheta + increment) < 0) {
      this.gradTheta = (this.gradTheta + increment) + 360;
    } else {
      this.gradTheta += increment;
    }

    return this.gradTheta;
  }

  public static calcGradPhi(increment: number) {
    if ((this.gradPhi + increment) > 360) {
      this.gradPhi = (this.gradPhi + increment) - 360;
    } else if ((this.gradPhi + increment) < 0) {
      this.gradPhi = (this.gradPhi + increment) + 360;
    } else {
      this.gradPhi += increment;
    }

    return this.gradPhi;
  }

  public static calcPositionCamera(incrementX: number, incrementY: number) {
    this.calcGradTheta(incrementX);
    this.calcGradPhi(incrementY);

    let z = Controls.initialTranslation * Utils.sin(this.gradTheta) * Utils.cos(this.gradPhi),
      y = Controls.initialTranslation * Utils.sin(this.gradTheta) * Utils.sin(this.gradPhi),
      x = Controls.initialTranslation * Utils.cos(this.gradTheta);

    return {
      x: x,
      y: y,
      z: z
    };
  }

  public static addKeyboardWASDControls(transform: Transform, increment: number = 0.05): void {
    let handler = (event: any) => {
      if (event.keyCode === 65) { // Left A
        transform.translate(-increment, 0, 0);
      } else if (event.keyCode === 68) { // Right D
        transform.translate(increment, 0, 0);
      } else if (event.keyCode === 87) { // Up W
        transform.translate(0, increment, 0);
      } else if (event.keyCode === 83) { // Down S
        transform.translate(0, -increment, 0);
      } else if (event.keyCode === 81) { // Front Q
        transform.translate(0, 0, -increment);
      } else if (event.keyCode === 69) { // Back E
        transform.translate(0, 0, increment);
      } else if (event.keyCode === 90) { // Rotate Up Z
        transform.rotateX(-increment);
      } else if (event.keyCode === 88) { // Rotate Down X
        transform.rotateX(increment);
      } else if (event.keyCode === 67) { // Rotate Left C
        transform.rotateY(-increment);
      } else if (event.keyCode === 86) { // Rotate Right V
        transform.rotateY(increment);
      }
    };

    window.addEventListener('keydown', handler);
  }

  public static addKeyboardArrowKeys(transform: Transform, increment: number = 0.05): void {
    let handler = (event: any) => {
      if (event.keyCode === 37) { // Left
        transform.translate(-increment, 0, 0);
      } else if (event.keyCode === 39) { // Right
        transform.translate(increment, 0, 0);
      } else if (event.keyCode === 38) { // Up
        transform.translate(0, increment, 0);
      } else if (event.keyCode === 40) { // Down
        transform.translate(0, -increment, 0);
      }
    };

    window.addEventListener('keydown', handler);

  }
}
