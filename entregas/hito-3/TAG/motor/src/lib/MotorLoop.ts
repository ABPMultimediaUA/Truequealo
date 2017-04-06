import { Renderer, Utils } from './index';
import { Node } from '../tree/Node';
import { MatrixStack } from '../tree/MatrixStack';

declare var Stats: any;


let stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

export class MotorLoop {
  private static renderer: Renderer = Renderer.getInstance();
  private static matrixStack: MatrixStack = MatrixStack.getInstance();
  private static rootNode: Node;

  public static iteration: number = 0; // 0: cameras, 1: lights, 2: models
  public static frameCount: number = 0;
  public static frameTick: number = 8; // 30fps para las animaciones


  /**
   * Punto de entrada del loop.
   *
   * En cada iteracion pintamos un recurso.
   */
  public static runLoop(): void {
    stats.begin();

    MotorLoop.matrixStack.reset(); // Inicializamos otra vez la matriz para no perder la matriz inversa de la camara
    MotorLoop.renderer.drawScene();
    MotorLoop.rootNode.draw()
    .then(() => {
      MotorLoop.iteration = 1;
      return MotorLoop.rootNode.draw();
    })
    .then(() => {
      MotorLoop.iteration = 2;
      return MotorLoop.rootNode.draw();
    })
    .then(() => {
      MotorLoop.iteration = 0;

      MotorLoop.countFrame();

      stats.end();
      Utils.requestAnimFrame(MotorLoop.runLoop);
    });
  }

  public static countFrame(): void {
    MotorLoop.frameCount++;

    if (MotorLoop.frameCount > MotorLoop.frameTick) {
      MotorLoop.frameCount = 0;
    }
  }

  /**
   * Especifica el nodo root del arbol de la escena.
   * @param {Node} node Nodo padre
   */
  public static setRootNode(node: Node): void {
    MotorLoop.rootNode = node;
  }
}
