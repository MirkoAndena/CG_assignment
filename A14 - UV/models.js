
function buildGeometry() {
	// Draws a pyramid --- To complete for the assignment. This is just the one in Assignment 13, where two 0.1, 0.1 UV components have been added to the vertices definitions. Such number must be replaced (differently for each vertexes), to obtain a proper Egyptian Pyramid	
	let pyramid = drawPyramid();
	addMesh(pyramid["vertices"], pyramid["indexes"], [0.0, 0.0, 1.0]);
	
	// Draws a cube -- To do for the assignment.
	let cube = drawCube();
	addMesh(cube["vertices"], cube["indexes"], [0.0, 0.0, 1.0]);
	
	
	// Draws a Cylinder --- To do for the assignment
	let cylinder = drawCylinder();
	addMesh(cylinder["vertices"], cylinder["indexes"], [0.0, 1.0, 1.0]);
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
		[-1, +1, +1,	0, 1, 0,	0.125,	0.625],
		[+1, +1, +1,	0, 1, 0,	0.25,	0.625],
		[+1, +1, -1,	0, 1, 0,	0.25,	0.75],
		[-1, +1, -1,	0, 1, 0,	0.125,	0.75],

 		[-1, -1, +1,	0, 0, 1,	0.125,	0.5],
		[+1, -1, +1,	0, 0, 1,	0.25,	0.5],
		[+1, +1, +1,	0, 0, 1,	0.25,	0.625],
		[-1, +1, +1,	0, 0, 1,	0.125,	0.625],

 		[-1, -1, -1,	-1, 0, 0,	0,		0.75],
		[-1, -1, +1,	-1, 0, 0,	0,		0.625],
		[-1, +1, +1,	-1, 0, 0,	0.125,	0.625],
		[-1, +1, -1,	-1, 0, 0,	0.125,	0.75],

 		[+1, -1, -1,	0, 0, -1,	0.25,	0.875],
		[-1, -1, -1,	0, 0, -1,	0.125,	0.875],
		[-1, +1, -1,	0, 0, -1,	0.125,	0.75],
		[+1, +1, -1,	0, 0, -1,	0.25,	0.75],
		
		[+1, -1, +1,	+1, 0, 0,	0.375,	0.625],
		[+1, -1, -1,	+1, 0, 0,	0.375,	0.75],
		[+1, +1, -1,	+1, 0, 0,	0.25,	0.75],
		[+1, +1, +1,	+1, 0, 0,	0.25,	0.625],

		[-1, -1, -1,	0, -1, 0,	0.125,	0.875],
		[+1, -1, -1,	0, -1, 0,	0.25,	0.875],
		[+1, -1, +1,	0, -1, 0,	0.25,	1],
		[-1, -1, +1,	0, -1, 0,	0.125,	1],
	];

	var ind = [
		0, 1, 2,
		0, 2, 3,
		4, 5, 6,
		4, 6, 7,
		8, 9, 10,
		8, 10, 11,
		12, 13, 14,
		12, 14, 15,
		16, 17, 18,
		16, 18, 19,
		20, 21, 22,
		20, 22, 23
	];

	return { "vertices": vert, "indexes": ind };
}

function drawCylinder() {

	let vert = [];
	let fractions = 2; 
	let d = Math.PI / fractions;

	vert.push([0, 3, 0, 0, 1, 0]);
	vert.push([0, -3, 0, 0, -1, 0]);

	let k, j;
	for(k = 0; k < 2*Math.PI; k = k + d) {
		for(j = 3; j >= -3; j = j - 6) {
			let x = Math.cos(k);
			let z = Math.sin(k);
			let norm = normalVersorForCylinder(k);
			vert.push([x, j, z, norm[0], norm[1], norm[2], 0, 0, 0]);
			vert.push([x, j, z, 0, j == -3 ? -1 : 1, 0, 0, 0, 0]);
		}
	}

	let ind = [];
	for (k = 2; k < vert.length - 7; k = k + 4) {
		ind.push(k);
		ind.push(k+6);
		ind.push(k+2);
		
		ind.push(k);
		ind.push(k+4);
		ind.push(k+6);
		
		ind.push(k+1);
		ind.push(0);
		ind.push(k+5);
		
		ind.push(k+3);
		ind.push(k+7);
		ind.push(1);
	}

	ind.push(vert.length - 4);
	ind.push(4);
	ind.push(vert.length - 2);
	
	ind.push(vert.length - 4);
	ind.push(2);
	ind.push(4);
	
	ind.push(vert.length - 3);
	ind.push(0);
	ind.push(3);
	
	ind.push(vert.length - 1);
	ind.push(5);
	ind.push(1);

	return { "vertices": vert, "indexes": ind };
}

function normalVersorForCylinder(teta) {
	let t = [Math.cos(teta), 0, Math.sin(teta)];
	let len = magnitude(t);
	return [t[0]/len, t[1]/len, t[2]/len];
}

function magnitude(vett) {
	return Math.sqrt(Math.pow(vett[0], 2) + Math.pow(vett[1], 2) + Math.pow(vett[2], 2));
}