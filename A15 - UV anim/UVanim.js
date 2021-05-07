function Anim1(t) {
	// moving car
	var translation = utils.MakeTranslateMatrix(t % 0.25, 0.5, 0);
	var scale = utils.MakeScaleMatrix(1/4);
	return utils.multiplyMatrices(translation, scale);
}

function Anim2(t) {
	// bumping code
	let x = 0.25 - Math.abs((t - 0.5) / 2);
	var translation = utils.MakeTranslateMatrix(0.75, 0.5 + x, 0);
	var scale = utils.MakeScaleMatrix(1/4);
	return utils.multiplyMatrices(translation, scale);
}

function Anim3(t) {
	// rotating fan
	return mul(
		utils.MakeTranslateMatrix(0.625, 0.875, 0),
		utils.MakeRotateZMatrix(t * 360),
		utils.MakeScaleMatrix(1/4),
		utils.MakeTranslateMatrix(-0.5, -0.5, 0)
	);
}

let index = 0;
function Anim4(t) {
	// buring flame
	let row = 5 - ((index / 12) | 0);
	let column = index % 12;
	index = (index + 1) % (12 * 6);

	let distance = 0.25 / 3;
	return mul(
		utils.MakeTranslateMatrix(
			column * distance,
			row * distance,
		0),
		utils.MakeScaleNuMatrix(1/12, 1/12, 1)
	);
}

function mul(...matrices) {
	var M = matrices[matrices.length - 1];
	let i;
	for (i = matrices.length - 2; i >= 0; i--)
		M = utils.multiplyMatrices(matrices[i], M);
	return M;
}