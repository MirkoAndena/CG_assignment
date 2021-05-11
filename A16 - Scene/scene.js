function drawSceneTree(S) {
	var i;
	for(i = 0; i < S.length; i++) {

		let parent = getParent(S, i);
		if (parent != -1) {
			//S[i][0] = S[i][0] + S[parent][0];
			//S[i][1] = S[i][1] + S[parent][1];
			//S[i][2] = S[i][2] + S[parent][2];
			S[i][3] = S[i][3] + S[parent][3];
			S[i][4] = S[i][4] + S[parent][4];
			S[i][5] = S[i][5] + S[parent][5];
		}

		draw(i, utils.multiplyMatrices(utils.multiplyMatrices(utils.multiplyMatrices(
			 utils.MakeTranslateMatrix(S[i][0], S[i][1], S[i][2]),
			 utils.MakeRotateZMatrix(S[i][5])),
			 utils.MakeRotateXMatrix(S[i][3])),
			 utils.MakeRotateYMatrix(S[i][4])));
	}
}

function getParent(S, index) {
	let j;
	for (j = 0; j < S.length; j++)
		if (S[j][6] <= index && index <= S[j][7])
			return j
	return -1;
}