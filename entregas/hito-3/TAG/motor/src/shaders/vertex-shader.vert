attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNormalMatrix;

uniform vec3 uAmbientLight;
uniform vec3 uDirectionalLightColor;
uniform vec3 uDirectionalVector;

varying vec2 vTextureCoord;
varying vec3 vLighting;

void main(void) {
  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
  vTextureCoord = aTextureCoord;

  vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);

  float directional = max(dot(transformedNormal.xyz, uDirectionalVector), 0.0);
  vLighting = uAmbientLight + (uDirectionalLightColor * directional);
}
