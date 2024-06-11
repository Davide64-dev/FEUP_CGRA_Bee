attribute vec3 aVertexPosition;
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform float timeFactor;

void main() {
    vec4 position = vec4(aVertexPosition, 1.0);
    position.z += 0.25 * timeFactor * sin(position.y * 0.5) * sin(position.y * 0.5);
    gl_Position = uPMatrix * uMVMatrix * position;
}
