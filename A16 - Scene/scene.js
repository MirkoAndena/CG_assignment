var matrices = [ ];

function drawSceneTree(S) {
	var i;
	for(i = 0; i < S.length; i++) {
		let parentMatrix = i == 0 ? utils.identityMatrix() : matrices[getParent(S, i)];
		let childMatrix = getMatrixOf(S, i);
		let matrix = utils.multiplyMatrices(parentMatrix, childMatrix);

		matrices.push(matrix);
		draw(i, matrix);
	}

	// Clear storage for next iteration
	matrices = [];
}

function getMatrixOf(S, index) {
	return mul(
		utils.MakeTranslateMatrix(S[index][0], S[index][1], S[index][2]),
		utils.MakeRotateZMatrix(S[index][5]),
		utils.MakeRotateXMatrix(S[index][3]),
		utils.MakeRotateYMatrix(S[index][4]));
}

function getParent(S, index) {
	let candidate;
	for (candidate = 0; candidate < S.length; candidate++)
		if (S[candidate][6] <= index && index <= S[candidate][7])
			return candidate
	return -1;
}

// Esegue la moltiplicazione partendo dall' ultima
function mul(...matrices) {
	var M = matrices[matrices.length - 1];
	let i;
	for (i = matrices.length - 2; i >= 0; i--)
		M = utils.multiplyMatrices(matrices[i], M);
	return M;
}