function buildGeometry() {
	var i;
	
	addMesh(F_points(), "O", [1.0, 0.0, 0.0]);
	addMesh(S_points(), "S", [0.0, 0.0, 1.0]);
	addMesh(Pentagon_points(), "F", [0.0, 1.0, 0.0]);
}

function F_points() {
	// Draws the outline of letter F (replace the vertices and primitive type)
	return [
		[3, 5, 0], [3, 3, 0], [-1, 3, 0], [-1, 1, 0],
		[1, 1, 0], [1, -1, 0], [-1, -1, 0], [-1, -5, 0],
		[-3, -5, 0], [-3, 5, 0]
	];
}

function S_points() {
	// Draws a filled S-shaped pattern (replace the vertices and primitive type)
	// TRIANGLE STRIP
	return [
		[3, 5, 0], [3, 3, 0], [1, 5, 0], [-1, 3, 0],
		[-3, 5, 0], [-1, 1, 0], [-3, -1, 0], [3, 1, 0],
		[1, -1, 0], [3, -5, 0], [1, -3, 0], [1, -5, 0],
		[-3, -3, 0], [-3, -5, 0]
	];
}

function Pentagon_points() {
	// Draws a filled pentacong (replace the vertices and primitive type)
	// TRIANGLE FAN
	return [
		[5, 0, 0], [0, 5, 0],
		[-5, 0, 0], [-3, -5,0], [3, -5, 0]
	];
}