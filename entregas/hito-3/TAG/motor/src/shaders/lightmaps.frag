struct TMaterial {
  sampler2D Diffuse;
  sampler2D Specular;
  float Shininess;
};

struct TLight {
  vec3 Position;
  vec3 Ambient;
  vec3 Diffuse;
  vec3 Specular;
};

uniform TMaterial Material;
uniform TLight Light;

vec3 Phong() {
  vec3 n = normalize(Normal);
  vec3 s = normalize(Light.Position - Position);
  vec3 v = normalize(-Position);
  vec3 r = reflect(-s, n);

  vec3 Ambient = Light.Ambient * vec3(texture(Material.Diffuse, TexCoords))

  vec3 Diffuse = Light.Diffuse * max(dot(s, n), 0.0) * vec3(texture(Material.Diffuse, TexCoords));

  vec3 Specular = Light.Specular + pow(max(dot(r, v), 0.0), Material.Shininess) * vec3(texture(Material.Specular, TexCoords));

  return Ambient + Diffuse + Specular;
};

void main() {

}
