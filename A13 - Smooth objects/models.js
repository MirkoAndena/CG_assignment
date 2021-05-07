function buildGeometry() {
	// Draws a pyramid --- Already done, just for inspiration
	var vert1 = [[0.0,1.0,0.0, 0.0, 0.4472,-0.8944],[ 1.0,-1.0,-1.0, 0.0, 0.4472,-0.8944],[-1.0,-1.0,-1.0, 0.0, 0.4472,-0.8944],
				 [0.0,1.0,0.0, 0.8944, 0.4472,0.0],[ 1.0,-1.0, 1.0, 0.8944, 0.4472,0.0],[ 1.0,-1.0,-1.0, 0.8944, 0.4472,0.0], 
				 [0.0,1.0,0.0, 0.0, 0.4472,0.8944],[-1.0,-1.0, 1.0, 0.0, 0.4472,0.8944],[ 1.0,-1.0, 1.0, 0.0, 0.4472,0.8944], 
				 [0.0,1.0,0.0, -0.8944, 0.4472,0.0],[-1.0,-1.0,-1.0, -0.8944, 0.4472,0.0],[-1.0,-1.0, 1.0, -0.8944, 0.4472,0.0], 
				 [-1.0,-1.0,-1.0, 0.0,-1.0,0.0],[1.0,-1.0,-1.0, 0.0,-1.0,0.0], [1.0,-1.0,1.0, 0.0,-1.0,0.0], [-1.0,-1.0,1.0, 0.0,-1.0,0.0],
				];
	var ind1 = [0, 1, 2,  3, 4, 5,  6, 7, 8,  9, 10, 11,  12, 13, 14,  12, 14, 15];
	var color1 = [0.0, 0.0, 1.0];
	addMesh(vert1, ind1, color1);
	
	// Draws a cube -- To do for the assignment.
	var cube = drawCube();
	addMesh(cube["vertices"], cube["indexes"], [0.0, 1.0, 1.0]);
	
	// Draws function y = sin(x) * cos(z) with -3 <= x <= 3 and -3 <= z <= 3 -- To do for the assignment.
	var func = drawFunction();
	addMesh(func["vertices"], func["indexes"], [0.0, 1.0, 1.0]);
	
	// Draws a Cylinder --- To do for the assignment
	var cylinder = drawCylinder();
	addMesh(cylinder["vertices"], cylinder["indexes"], [0.0, 1.0, 0.0]);

	// Draws a Sphere --- To do for the assignment.
	var sphere = drawSphere();
	addMesh(sphere["vertices"], sphere["indexes"], [1.0, 0.0, 0.0]);
}

function drawCube() {
	var vertices = [];
	vertices[0] = [-3, 3, 3, 0, 0, 1];
	vertices[1] = [-3, -3, 3, 0, 0, 1];
	vertices[2] = [3, -3, 3, 0, 0, 1];
	vertices[3] = [3, 3, 3, 0, 0, 1];
	vertices[4] = [3, 3, 3, 1, 0, 0];
	vertices[5] = [3, -3, 3, 1, 0, 0];
	vertices[6] = [3, -3, -3, 1, 0, 0];
	vertices[7] = [3, 3, -3, 1, 0, 0];
	vertices[8] = [3, 3, -3, 0, 0, -1];
	vertices[9] = [3, -3, -3, 0, 0, -1];
	vertices[10] = [-3, -3, -3, 0, 0, -1];
	vertices[11] = [-3, 3, -3, 0, 0, -1];
	vertices[12] = [-3, 3, -3, -1, 0, 0];
	vertices[13] = [-3, -3, -3, -1, 0, 0];
	vertices[14] = [-3, -3, 3, -1, 0, 0];
	vertices[15] = [-3, 3, 3, -1, 0, 0];
	vertices[16] = [-3, 3, -3, 0, 1, 0];
	vertices[17] = [-3, 3, 3, 0, 1, 0];
	vertices[18] = [3, 3, 3, 0, 1, 0];
	vertices[19] = [3, 3, -3, 0, 1, 0];
	vertices[20] = [-3, -3, 3, 0, -1, 0];
	vertices[21] = [3, -3, -3, 0, -1, 0];
	vertices[22] = [3, -3, 3, 0, -1, 0];
	vertices[23] = [-3, -3, -3, 0, -1, 0];

	indexes = [0,1,2,  0,2,3,  4,5,6,  4,6,7,  8,9,10,  8,10,11,  12,13,14,  12,14,15,  16,17,18,  16,18,19,  20,21,22,  20,23,21];

	return { "vertices": vertices, "indexes": indexes };
}

function normalVersorForFunction(vett) {
	// Prodotto vettoriale delle derivate (direzioni rispetto ai due assi), trovo cosi il vettore normale
	var vettNorm = [-Math.cos(vett[0])*Math.cos(vett[2]), 1, Math.sin(vett[0])*Math.sin(vett[2])];
	var len = magnitude(vettNorm);
	var versNorm = [vettNorm[0]/len, vettNorm[1]/len, vettNorm[2]/len];
	return versNorm;
}

function magnitude(vett) {
	return Math.sqrt(Math.pow(vett[0], 2) + Math.pow(vett[1], 2) + Math.pow(vett[2], 2));
}

function drawFunction() {
	let vert = [];
	let fractions = 8;
	let x, z;
	for(z = -3; z <= 3; z = z + 1 / fractions) {
		for(x = -3; x <= 3; x = x + 1 / fractions) {
			var y = Math.sin(x) * Math.cos(z);
			var norm = normalVersorForFunction([x, y, z]);
			vert.push([x, y, z, norm[0], norm[1], norm[2]]);
		}
	}

	let ind = [];
	let range = 7 * fractions - (fractions - 1);
	let index;
	for(index = 0; index < vert.length - range - 1; index++) {

		// Non bisogna creare dei triangoli che partono dall'ultimo punto della riga
		if (index % range == range - 1)
			continue;

		// Primo triangolo
		ind.push(index);
		ind.push(index + range);
		ind.push(index + range + 1);

		// Secondo triangolo
		ind.push(index);
		ind.push(index + range + 1);
		ind.push(index + 1);
	}

	return { "vertices": vert, "indexes": ind };
}

function normalVersorForCylinder(teta) {
	// Prodotto vettoriale delle derivate (direzioni rispetto ai due assi), trovo cosi il vettore normale
	let t = [Math.cos(teta), 0, Math.sin(teta)];
	let len = magnitude(t);
	return [t[0]/len, t[1]/len, t[2]/len];
}

function drawCylinder() {
	let vert = [];
	let r = 3; 
	let fractions = 20; 
	let d = Math.PI / fractions;

	vert.push([0, 3, 0, 0, 1, 0]);
	vert.push([0, -3, 0, 0, -1, 0]);

	let k, j;
	for(k = 0; k < 2*Math.PI; k = k + d) {
		for(j = 3; j >= -3; j = j - 6) {
			let x = r * Math.cos(k);
			let z = r * Math.sin(k);
			let norm = normalVersorForCylinder(k);
			vert.push([x, j, z, norm[0], norm[1], norm[2]]);
			vert.push([x, j, z, 0, j == -3 ? -1 : 1, 0]); // vertici con versori verso alto e basso
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

	// Ultimi triangoli che devono usare i primi vertici
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

function normalVersorForSphere(r, teta, phi) {
	// Coordinate sferiche
	// Prodotto vettoriale delle derivate (direzioni rispetto ai due assi), trovo cosi il vettore normale
	let r2 = Math.pow(r, 2);
	let sinTeta = Math.sin(teta);
	let sin2Teta = Math.pow(sinTeta, 2);
	let cosTeta = Math.cos(teta);
	let sinPhi = Math.sin(phi);
	let cosPhi = Math.cos(phi);
	let t = [
		- r2 * sin2Teta * cosPhi,
		- r2 * sinTeta * cosTeta,
		- r2 * sin2Teta * sinPhi
	];
	let len = magnitude(t);
	return [t[0]/len, t[1]/len, t[2]/len];
}

function drawSphere() {
	var vert = [];
	let r = 3; 
	let fractions = 5; 
	let d = Math.PI / fractions;
	let k, j;
	for(k = - Math.PI; k < Math.PI; k = k + d) {
		for(j = - Math.PI; j < Math.PI; j = j + d) {
			let x = r * Math.sin(k) * Math.cos(j); 
			let z = r * Math.sin(k) * Math.sin(j);
			let y = r * Math.cos(k);
			let norm = normalVersorForSphere(r, k, j);
			vert.push([x, y, z, norm[0], norm[1], norm[2]]);
		}
	}

	var ind = [];
	for(k = 0; k < vert.length - 2 * fractions; k++) {
		ind.push(k);
		ind.push(k + 2 * fractions);
		ind.push(k + 1);
		
		ind.push(k);
		ind.push(k + 2 * fractions - 1);
		ind.push(k + 2 * fractions);
	}

	return { "vertices": vert, "indexes": ind };
}