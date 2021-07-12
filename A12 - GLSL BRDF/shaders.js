function shaders() {
// The shader can find the required informations in the following variables:

//vec3 fs_pos;		// Position of the point in 3D space
//
//float SpecShine;		// specular coefficient for both Blinn and Phong
//float DToonTh;		// Threshold for diffuse in a toon shader
//float SToonTh;		// Threshold for specular in a toon shader
//
//vec4 diffColor;		// diffuse color
//vec4 ambColor;		// material ambient color
//vec4 specularColor;		// specular color
//vec4 emit;			// emitted color
//	
//vec3 normalVec;		// direction of the normal vecotr to the surface
//vec3 eyedirVec;		// looking direction
//
//
// Lighr directions can be found into:
//vec3 lightDirA;
//vec3 lightDirB;
//vec3 lightDirC;
//
//and intensity is returned into:
//
//vec4 lightColorA;
//vec4 lightColorB;
//vec4 lightColorC;
//
// Ambient light contribution can be found intop
//
// vec4 ambientLight;

// Lambert diffuse and Ambient material. No specular or emisssion.
var S1 = `
	vec4 LAcontr = clamp(dot(lightDirA, normalVec),0.0,1.0) * lightColorA;
	vec4 LBcontr = clamp(dot(lightDirB, normalVec),0.0,1.0) * lightColorB;
	vec4 LCcontr = clamp(dot(lightDirC, normalVec),0.0,1.0) * lightColorC;
	out_color = clamp(diffColor * (LAcontr + LBcontr + LCcontr) + ambientLight * ambColor, 0.0, 1.0);
`;

// Lambert diffuse and Blinn specular. No ambient and emission.
var S2 = `
	vec4 diffA = clamp(dot(lightDirA, normalVec),0.0,1.0) * lightColorA;
	vec4 diffB = clamp(dot(lightDirB, normalVec),0.0,1.0) * lightColorB;
	vec4 diffC = clamp(dot(lightDirC, normalVec),0.0,1.0) * lightColorC;
	vec3 HA = normalize(lightDirA + eyedirVec);
	vec3 HB = normalize(lightDirB + eyedirVec);
	vec3 HC = normalize(lightDirC + eyedirVec);
	vec4 specA = pow(clamp(dot(normalVec, HA), 0.0, 1.0), SpecShine) * lightColorA;
	vec4 specB = pow(clamp(dot(normalVec, HB), 0.0, 1.0), SpecShine) * lightColorB;
	vec4 specC = pow(clamp(dot(normalVec, HC), 0.0, 1.0), SpecShine) * lightColorC;

	out_color = clamp(diffColor * (diffA + diffB + diffC) + specularColor * (specA + specB + specC), 0.0, 1.0);
`;

// Ambient and Phong specular. No emssion and no diffuse.
var S3 = `
	vec4 specA = pow(clamp(dot(eyedirVec, -reflect(lightDirA, normalVec)), 0.0, 1.0), SpecShine) * lightColorA;
	vec4 specB = pow(clamp(dot(eyedirVec, -reflect(lightDirB, normalVec)), 0.0, 1.0), SpecShine) * lightColorB;
	vec4 specC = pow(clamp(dot(eyedirVec, -reflect(lightDirC, normalVec)), 0.0, 1.0), SpecShine) * lightColorC;
	out_color = clamp(specularColor * (specA + specB + specC) + ambientLight * ambColor, 0.0, 1.0);
`;

// Diffuse, ambient, emission and Phong specular.
var S4 = `
	vec4 diffA = clamp(dot(lightDirA, normalVec),0.0,1.0) * lightColorA;
	vec4 diffB = clamp(dot(lightDirB, normalVec),0.0,1.0) * lightColorB;
	vec4 diffC = clamp(dot(lightDirC, normalVec),0.0,1.0) * lightColorC;
	vec4 specA = pow(clamp(dot(eyedirVec, -reflect(lightDirA, normalVec)), 0.0, 1.0), SpecShine) * lightColorA;
	vec4 specB = pow(clamp(dot(eyedirVec, -reflect(lightDirB, normalVec)), 0.0, 1.0), SpecShine) * lightColorB;
	vec4 specC = pow(clamp(dot(eyedirVec, -reflect(lightDirC, normalVec)), 0.0, 1.0), SpecShine) * lightColorC;
	out_color = clamp(diffColor * (diffA + diffB + diffC) + specularColor * (specA + specB + specC) + ambientLight * ambColor + emit, 0.0, 1.0);
`;

// Ambient, Toon diffuse and and Toon (Blinn based) specular. No emssion.
var S5 = `
	vec4 diffA = dot(lightDirA, normalVec) >= DToonTh ? lightColorA : (0, 0, 0, 1);
	vec4 diffB = dot(lightDirB, normalVec) >= DToonTh ? lightColorB : (0, 0, 0, 1);
	vec4 diffC = dot(lightDirC, normalVec) >= DToonTh ? lightColorC : (0, 0, 0, 1);
	vec4 specA = dot(normalVec, normalize(lightDirA + eyedirVec)) >= SToonTh ? lightColorA : (0, 0, 0, 1);
	vec4 specB = dot(normalVec, normalize(lightDirA + eyedirVec)) >= SToonTh ? lightColorB : (0, 0, 0, 1);
	vec4 specC = dot(normalVec, normalize(lightDirA + eyedirVec)) >= SToonTh ? lightColorC : (0, 0, 0, 1);
	out_color = clamp(diffColor * (diffA + diffB + diffC) + specularColor * (specA + specB + specC) + ambientLight * ambColor, 0.0, 1.0);
`;

	return [S1, S2, S3, S4, S5];
}

