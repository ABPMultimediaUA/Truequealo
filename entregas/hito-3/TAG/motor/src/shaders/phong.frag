precision highp float;

#define MAX_LIGHTS 5
struct light {
  vec3 uLightPosition;
  vec4 uLightAmbient;
  vec4 uLightDiffuse;
  vec4 uLightSpecular;
};

uniform light uLight;

uniform vec4 uTest;

uniform vec4 uMaterialAmbient;
uniform vec4 uMaterialDiffuse;
uniform vec4 uMaterialSpecular;
uniform float uShininess;
uniform sampler2D uSampler;

varying vec3 vNormal;
varying vec4 vFinalColor;
varying vec4 vVertex;
varying vec2 vTextureCoord;

void main(void) {

  // Normal al vertice
  vec3 normal = normalize(vNormal);

  // Vector del vertice a la camara
  vec3 E = normalize(-vec3(vVertex.xyz));

  vec3 lightDir = normalize(uLight.uLightPosition - vVertex.xyz);

  vec3 reflection = reflect(-lightDir, normal);
  float lambert = 0.0;

  vec4 Ia = vec4(0.0,0.0,0.0,1.0);
  vec4 Id = vec4(0.0,0.0,0.0,1.0);
  vec4 Is = vec4(0.0,0.0,0.0,1.0);

  float specular = 0.0;
// cambiar el vec4 por lo que había y la el 1.0 del specular por uShininess.

  Ia = uLight.uLightAmbient * uMaterialAmbient;

  lambert = max(dot(lightDir, normal), 0.0);
  Id = uLight.uLightDiffuse * uMaterialDiffuse * lambert;

  specular = pow(max(dot(reflection, E), 0.0), uShininess);
  Is = uLight.uLightSpecular * uMaterialSpecular * specular;


  vec4 finalColor = Ia + Id + Is;
  finalColor.a = 1.0;

  gl_FragColor = finalColor * texture2D(uSampler, vTextureCoord);





}
