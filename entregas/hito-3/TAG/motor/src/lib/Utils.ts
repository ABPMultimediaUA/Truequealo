export class Utils {
  /**
   * Obtiene el contexto del canvas para WebGL
   * @param {HTMLCanvasElement} canvas Elemento canvas
   * @return {WebGLRenderingContext} Contexto WebGL
   */
  public static getGlContext(canvas: HTMLCanvasElement): WebGLRenderingContext {
    let contextNames = [
      'webgl',
      'experimental-webgl',
      'webkit-3d',
      'moz-webgl'
    ],
      context: WebGLRenderingContext;

    contextNames.forEach((name) => {
      if (!context) {
        context = <WebGLRenderingContext>canvas.getContext(name);
      }
    });

    return context;
  }

  /**
   * Se le pasa la funcion callback a requestAnimationFrame del navegador simulando
   * un bucle cada X frames por segundo.
   * @param {FrameRequestCallback} callback Funcion a llamar en cada iteracion
   */
  public static requestAnimFrame(callback: FrameRequestCallback): any {
    return window.requestAnimationFrame(callback) ||
      window.webkitRequestAnimationFrame(callback) ||
      function(callback: FrameRequestCallback, element: any) {
        window.setTimeout(callback, 1000 / 60);
      };
  }

  /**
   * Carga un fichero haciendo una peticion AJAX.
   * @param {string} path URL del fichero
   * @return {Promise<any>} Promesa
   */
  public static loadFile(path: string): Promise<string> {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();

      request.open('GET', path, true);

      request.onload = () => {
        if (request.status >= 200 && request.status < 300) {
          return resolve(request.responseText);
        } else {
          return reject(request);
        }
      };

      request.onerror = () => {
        return reject(request);
      };

      request.send();
    });
  }

  /**
   * Wrapper para loadFile de shaders.
   * @param {string} shader nombre del shader
   * @return {Promise<string>} Promesa
   */
  public static loadShader(shader: string): Promise<string> {
    return Utils.loadFile(`../../shaders/${shader}`);
  }

  /**
   * Convertir de grados a radianes.
   * @param {number} degrees Grados a convertir
   * @return {number}
   */
  public static radians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  /**
   * Convertir de radianes a grados.
   * @param {number} radians Radianes a convertir.
   * @return {number}
   */
  public static degrees(radians: number): number {
    return radians * 180 / Math.PI;
  }

  public static roundNumber(value: number, decimals?: number): number {
    return Math.round(value * Math.pow(10, decimals || 5)) / Math.pow(10, decimals || 5);
  }

  public static cos(degrees: number): number {
    return Utils.roundNumber(Math.cos(Utils.radians(degrees)));
  }

  public static sin(degrees: number): number {
    return Utils.roundNumber(Math.sin(Utils.radians(degrees)));
  }
  /**
 * Parse the MTL file, appending relevant data to the data object.
 * @param {string} mtl: contents of an MTL file.
 * @param {Object} data: the data object you are appending information to.
 */
  public static parseMtl(mtl: any) {
    var data: any = {};

    mtl.split('\n').forEach(function(line: any) {
      var split = line.split(' ');

      switch (split[0]) {
        case 'Ns':
          // Specular power.
          data.specularPower = parseFloat(split[1]);
          break;
        case 'Ka':
          // Ambient Light
          data.ambient = split.slice(1).map(function(val: any) {
            return parseFloat(val);
          });
          break;
        case 'Kd':
          // Diffuse Light
          data.diffuse = split.slice(1).map(function(val: any) {
            return parseFloat(val);
          });
          break;
        case 'Ks':
          // Specular light
          data.specular = split.slice(1).map(function(val: any) {
            return parseFloat(val);
          });
          break;
        case 'd':
        case 'Tr':
          // Dissolved/Transparent
          data.opacity = parseFloat(split[1]);
          break;
        case 'Tf':
          data.emissive = parseFloat(split[1]);
          break;
        default:
          break;
      }

    });

    return data;
  }
}
