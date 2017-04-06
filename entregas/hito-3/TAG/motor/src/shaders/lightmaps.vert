#Vertex shader lighting maps
layout (location = 0) in vec4 VertexPosition #Vertice en coord locales
layout (location = 1) in vec3 VertexNormal; #Normal en coord locales
layout (location = 2) in vec2 TextureCoords; # Coord de textura

out vec3 Position; #Vert en coord de vista
out vec3 Normal; #Normal en coord vista
out vec2 TexCoords; #Coord de textura

uniform mat4 ModelViewMatrix;
uniform mat4 NormalMatrix;
uniform mat4 MVP;

void main() {
 #transformar vertice y normal a coord de vista
 Position = vec3 (ModelViewMatrix * VertexPosition);
 Normal = normalize(NormalMatrix * VertexNormal);

 TexCoords = TextureCoords;

 gl_Position = MVP * VertexPosition;
}
