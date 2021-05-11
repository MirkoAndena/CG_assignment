var ok = true;
function test(S) {
	if (ok) {
		console.log("tree of 14: " + getTreeOf(S, 14));
		ok = false;
	}
}


function drawSceneTree(S) {
	var i;
	test(S);
	for(i = 0; i < S.length; i++) {
		draw(i, makeMatrix(S, i));
	}
}

function makeMatrix(S, i) {
	let M = utils.identityMatrix();
	let tree = getTreeOf(S, i);
	let j;
	for (j = 0; j < tree.length; j++) {
		let tranform = utils.multiplyMatrices(utils.multiplyMatrices(utils.multiplyMatrices(
			utils.MakeTranslateMatrix(S[j][0], S[j][1], S[j][2]),
			utils.MakeRotateZMatrix(S[j][5])),
			utils.MakeRotateXMatrix(S[j][3])),
			utils.MakeRotateYMatrix(S[j][4]));
		M = utils.multiplyMatrices(M, tranform);
	}
	return M;
}

function getTreeOf(S, index) {
	let tree = [ index ];
	let j;
	for (j = S.length - 1; j >= 0; j--) {
		let last = tree[tree.length - 1];
		if (S[j][6] <= last && last <= S[j][7])
			tree.push(j);
	}
	return tree;
}

// ----------------------------------------------------------------------------------------

function drawSceneTree(S) {
	var i;
	for(i = 0; i < S.length; i++) {
		draw(i, utils.multiplyMatrices(
			getParentMatrix(S, i),
			getTransformMatrix(S, i)
		));
	}
}

function getTransformMatrix(S, index) {
	// Creazione matrice con traslazione e rotazione di una riga
	return utils.multiplyMatrices(utils.multiplyMatrices(utils.multiplyMatrices(
		utils.MakeTranslateMatrix(S[index][0], S[index][1], S[index][2]),
		utils.MakeRotateZMatrix(S[index][5])),
		utils.MakeRotateXMatrix(S[index][3])),
		utils.MakeRotateYMatrix(S[index][4]))
}

function getParentMatrix(S, index) {
	// Cerca la matrice di trasformazione del padre di index
	let j;
	for (j = 0; j < S.length; j++)
		if (S[j][6] <= index && index <= S[j][7])
			return getTransformMatrix(S, j);
	return utils.identityMatrix();
}