function shaders() {
// The shader can find the required informations in the following variables:

//vec3 fs_pos;    // Position of the point in 3D space
//
//vec3  Pos;    // Position of first (or single) light
//vec3  Dir;    // Direction of first (or single) light
//float ConeOut;  // Outer cone (in degree) of the light (if spot)
//float ConeIn;    // Inner cone (in percentage of the outher cone) of the light (if spot)
//float Decay;    // Decay factor (0, 1 or 2)
//float Target;    // Target distance
//vec4  lightColor;  // color of the first light
//    
//
//vec4 ambientLightColor;    // Ambient light color. For hemispheric, this is the color on the top
//vec4 ambientLightLowColor;  // For hemispheric ambient, this is the bottom color
//vec3 ADir;          // For hemispheric ambient, this is the up direction
//vec4 SHconstColor;    // For spherical harmonics, constant term
//vec4 SHDeltaLxColor;    // For spherical harmonics, DeltaLx color
//vec4 SHDeltaLyColor;    // For spherical harmonics, DeltaLy color
//vec4 SHDeltaLzColor;    // For spherical harmonics, DeltaLz color
//
//vec3 normalVec;        // direction of the normal vector to the surface
//
//
// Final direction and colors are returned into:
//vec3 OlightDir;
//
//and intensity is returned into:
//
//vec4 OlightColor;
//
// Ambient light contribution is returned into
//
// vec4 ambientColor;

// Single directional light, constant ambient
var S1 = `
	OlightDir = Dir;
	OlightColor = lightColor;
	ambientColor = ambientLightColor;
`;

// Single point light without decay
var S2 = `
	OlightDir = normalize(Pos - fs_pos);
	OlightColor = lightColor;
`;

// Single spot light (without decay), constant ambient
var S3 = `
	vec3 px = normalize(Pos - fs_pos);
	OlightDir = px;
	float co = radians(ConeOut);
	float ci = co * ConeIn;
	float f = (dot(px, Dir) - co)/(ci - co);
	OlightColor = clamp(f, 0.0, 1.0) * lightColor;
	ambientColor = ambientLightColor;
`;

// Single point light with decay
var S4 = `
	OlightDir = normalize(Pos - fs_pos);
	float t = Target / length(Pos - fs_pos);
	OlightColor = lightColor * pow(t, Decay);
`;

// Single spot light (with decay)
var S5 = `
	vec3 px = normalize(Pos - fs_pos);
	OlightDir = px;
	float co = radians(ConeOut);
	float ci = co * ConeIn;
	float f = (dot(px, Dir) - co)/(ci - co);
	float t = Target / length(Pos - fs_pos);
	OlightColor = clamp(f, 0.0, 1.0) * pow(t, Decay) * lightColor;
	ambientColor = ambientLightColor;
`;

// Single point light, hemispheric ambient 
var S6 = `
	OlightDir = normalize(Pos - fs_pos);
	float t = Target / length(Pos - fs_pos);
	OlightColor = lightColor * pow(t, Decay);
	vec4 firstTerm = (dot(normalVec, Dir) + 1.0)/2.0 * ambientLightColor;
	vec4 secondTerm = (1.0 - dot(normalVec, Dir))/2.0 * ambientLightLowColor;
	ambientColor = firstTerm + secondTerm;
`;

// Single spot light, spherical harmonics ambient
var S7 = `
	vec3 px = normalize(Pos - fs_pos);
	OlightDir = px;
	float co = radians(ConeOut);
	float ci = co * ConeIn;
	float f = (dot(px, Dir) - co)/(ci - co);
	float t = Target / length(Pos - fs_pos);
	OlightColor = clamp(f, 0.0, 1.0) * pow(t, Decay) * lightColor;
	ambientColor = SHconstColor + 
			normalVec[0] * SHDeltaLxColor + 
			normalVec[1] * SHDeltaLyColor +
			normalVec[2] * SHDeltaLzColor;
`;
	return [S1, S2, S3, S4, S5, S6, S7];
}