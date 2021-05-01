
function buildGeometry() {
	// Draws a pyramid --- To complete for the assignment. This is just the one in Assignment 13, where two 0.1, 0.1 UV components have been added to the vertices definitions. Such number must be replaced (differently for each vertexes), to obtain a proper Egyptian Pyramid	
	let pyramid = drawPyramid();
	addMesh(pyramid["vertices"], pyramid["indexes"], [0.0, 0.0, 1.0]);
	
	// Draws a cube -- To do for the assignment.
	let cube = drawCube();
	addMesh(cube["vertices"], cube["indexes"], [0.0, 0.0, 1.0]);
	
	
	// Draws a Cylinder --- To do for the assignment
	var vert3 = [[-1.0,-1.0,0.0, 0.0, 0.0,1.0, 0.0,0.0], [1.0,-1.0,0.0, 0.0, 0.0,1.0, 0.5,0.0], [1.0,1.0,0.0, 0.0, 0.0,1.0, 0.5,0.5], [-1.0,1.0,0.0, 0.0, 0.0,1.0, 0.0,0.5]];
	var ind3 = [0, 1, 2,  0, 2, 3];
	var color3 = [0.0, 1.0, 1.0];
	addMesh(vert3, ind3, color3);
}

function drawPyramid() {

	var vert = [
		[0.0,	1.0,	0.0,	0.0,		0.4472,		-0.8944,	0.625,	0.5],
		[1.0,	-1.0,	-1.0,	0.0,		0.4472,		-0.8944,	0.5,	0.25],
		[-1.0,	-1.0,	-1.0,	0.0,		0.4472,		-0.8944,	0.75,	0.25],

		[0.0,	1.0,	0.0,	0.8944,		0.4472,		0.0,		0.625,	0.5],
		[1.0,	-1.0,	1.0,	0.8944,		0.4472,		0.0,		0.5,	0.25],
		[1.0,	-1.0,	-1.0,	0.8944,		0.4472,		0.0,		0.75,	0.25],

		[0.0,	1.0,	0.0,	0.0,		0.4472,		0.8944,		0.625,	0.25],
		[-1.0,	-1.0,	1.0,	0.0,		0.4472,		0.8944,		0.5,	0],
		[1.0,	-1.0,	1.0,	0.0,		0.4472,		0.8944,		0.75,		0],

		[0.0,	1.0,	0.0,	-0.8944,	0.4472,		0.0,		0.875,	0.5],
		[-1.0,	-1.0,	-1.0,	-0.8944,	0.4472,		0.0,		0.75,	0.25],
		[-1.0,	-1.0,	1.0,	-0.8944,	0.4472,		0.0,		1,		0.25], 

		[-1.0,	-1.0,	-1.0,	0.0,		-1.0,		0.0,		0.75,	0.25],
		[1.0,	-1.0,	-1.0,	0.0,		-1.0,		0.0,		1,		0.25],
		[1.0,	-1.0,	1.0,	0.0,		-1.0,		0.0,		1,		0],
		[-1.0,	-1.0,	1.0,	0.0,		-1.0,		0.0,		0.75,	0]
	];

	var ind = [0, 1, 2,  3, 4, 5,  6, 7, 8,  9, 10, 11,  12, 13, 14,  12, 14, 15];

	return { "vertices": vert, "indexes": ind };
}

function drawCube() {

	var vert = [
		[-1,	1,	1,	0,	1,	0,	0.125,	0.625],
		[1,		1,	1,	0,	1,	0, 	0.25,	0.625],
		[1,		1,	-1,	0,	1,	0,	0.25,	0.75],

		[-1,	1,	1,	0,	1,	0,	0.125,	0.625],
		[1,		1,	-1,	0,	1,	0,	0.25,	0.75],
		[-1,	1,	-1,	0,	1,	0, 	0.125,	0.75],

		[-1,	-1,	1,	0,	0,	1,	0.125,	0.625],
		[1,		1,	1,	0,	0,	1,	0.25,	0.625],
		[1,		-1,	1,	0,	0,	1,	0.25,	0.5],
	];

	var ind = [0, 1, 2,  3, 4, 5,  6, 7, 8];

	return { "vertices": vert, "indexes": ind };
}