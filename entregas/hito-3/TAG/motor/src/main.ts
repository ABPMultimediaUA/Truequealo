import { Layout } from './Layout';

import { Entregable1 } from './Entregable1';


/**
 * Shaders a implementar:
 * Phong, Cartoon, Normales en las texturas.
 */

export default class Main {

  constructor() {
    let entregable = new Entregable1();
    new Layout();

    document.getElementById('enlace-anim').addEventListener('click', (event) => {
      entregable.setFoxAnimation();
    });

    document.getElementById('enlace-texturas').addEventListener('click', (event) => {
      entregable.setTexturas()
    });

    document.getElementById('enlace-inicio').addEventListener('click', (event) => {
      entregable.setDeer();
    });
  }

}
new Main();
