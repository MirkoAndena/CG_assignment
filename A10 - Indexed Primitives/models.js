function buildGeometry() {
	var i;

	var ex1 = exercize1();
	var color2 = [0.0, 0.0, 1.0];
	addMesh(ex1.vert, ex1.ind, color2);

	var ex2 = exercize2();
	var color3 = [1.0, 0.0, 0.0];
	addMesh(ex2.vert, ex2.ind, color3);
}

function exercize1() {
	// Draws function y = sin(x) * cos(z) with -3 <= x <= 3 and -3 <= z <= 3.
	let vert = [];
	let fractions = 8; // Moltiplicatore dei punti (range da -3 a 3 sono 7, con fractions 2 diventano 14 punti)
	// Creazione dei punti, per ogni punto del piano xz calcolo la y corrispondente
	let x, z;
	for(z = -3; z <= 3; z = z + 1 / fractions) {
		for(x = -3; x <= 3; x = x + 1 / fractions) {
			vert.push([x, Math.sin(x) * Math.cos(z), z]);
		}
	}

	// Per creare i triangoli uso i punti della riga superiore quindi i (punto in basso a sinistra) parte
	// da 0 e va fino alla penultima riga penultima cella
	// 7 => numero di punti per ogni riga da -3 a 3 compresi
	// Per via del backface culling bisogna prendere i punti in senso orario
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

		// Visione da sotto
		ind.push(index);
		ind.push(index + range + 1);
		ind.push(index + range);
		
		ind.push(index);
		ind.push(index + 1);
		ind.push(index + range + 1);
	}

	return { vert: vert, ind: ind };
}

function exercize2() {
	// Draws an Half-sphere
	var vert2 = [];
	let r = 2; // raggio della sfera
	let fractions = 100; // numero di punti che compongono un cerchio
	let d = Math.PI / fractions; // delta avanzamento
	let range = 2 * Math.PI;
	let k;
	for(k = - Math.PI / 2; k < Math.PI / 2; k = k + d) {
		for(j = 0; j < 2 * Math.PI; j = j + d) {
			// Utilizzo delle cordinate sferiche per trovare i punti
			let x = r * Math.sin(k) * Math.cos(j);
			let z = r * Math.sin(k) * Math.sin(j);
			let y = r * Math.cos(k);
			vert2.push([x, y, z]);
		}
	}

	var ind2 = [];
	// Anche qui per via del backface culling bisogna prendere i punti in senso orario
	for(k = 0; k < vert2.length - range - 1; k++) {
		// Primo triangolo
		ind2.push(k);
		ind2.push(k + 2 * fractions);
		ind2.push(k + 1);
		
		// Secondo triangolo
		ind2.push(k);
		ind2.push(k + 2 * fractions - 1);
		ind2.push(k + 2 * fractions);
	}

	return { vert: vert2, ind: ind2 };
}