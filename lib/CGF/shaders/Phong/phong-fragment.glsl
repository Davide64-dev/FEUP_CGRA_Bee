#version 300 es 
precision highp float;

uniform mat4 uMVMatrix;

uniform float uShininess;
uniform vec3 uLightDirection;

uniform vec4 uLightAmbient;
uniform vec4 uLightDiffuse;
uniform vec4 uLightSpecular;

uniform vec4 uMaterialAmbient;
uniform vec4 uMaterialDiffuse;
uniform vec4 uMaterialSpecular;

in vec3 vNormal;
in vec3 vEyeVec;

out vec4 fragColor;

void main() {
	// Normalize light to calculate lambertTerm
	vec3 L = normalize(vec3(uMVMatrix * vec4(uLightDirection, 0.0)));

    // Transformed normal position
	vec3 N = normalize(vNormal);

    // Lambert's cosine law
	float lambertTerm = dot(N, -L);

    vec4 Ia = uLightAmbient * uMaterialAmbient;

    vec4 Id = vec4(0.0, 0.0, 0.0, 1.0);

    vec4 Is = vec4(0.0, 0.0, 0.0, 1.0);

    if (lambertTerm > 0.0) {
        Id = uLightDiffuse * uMaterialDiffuse * lambertTerm;

        vec3 E = normalize(vEyeVec);
        vec3 R = reflect(L, N);
        float specular = pow( max( dot(R, E), 0.0 ), uShininess);

        Is = uLightSpecular * uMaterialSpecular * specular;
    }

	vec4 finalColor = Ia + Id + Is;

     fragColor = finalColor;
}