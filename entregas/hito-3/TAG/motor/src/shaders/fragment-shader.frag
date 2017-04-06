precision highp float;

varying vec2 vTextureCoord;
varying vec3 vLighting;

uniform sampler2D uSampler;

void main(void) {
  vec4 texelColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));

  // gl_FragColor = vec4(vLighting, 1.0);
  gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);
}
