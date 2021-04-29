function axonometry() {
	
	var A1 = resolutionMatrixE1();
	var A2 = resolutionMatrixE2();
	var A3 = resolutionMatrixE3();
	var O1 = resolutionMatrixE4();
	var O2 = resolutionMatrixE5();

	return [A1, A2, A3, O1, O2];
}

function createPort(w, a, f, n) {
	var T = utils.MakeTranslateMatrix(0, 0, (f+n)/2);
	var S = utils.MakeScaleNuMatrix(1/w, a/w, 2/(f-n));
	var M = utils.MakeScaleNuMatrix(1, 1, -1);
	return utils.multiplyMatrices(M, utils.multiplyMatrices(S, T));
}

function resolutionMatrixE1() {
	// Make an isometric view, w = 50, a = 16/9, n = 1, f = 101.
	var w = 50;
	var a = 16/9;
	var n = 1;
	var f = 101;
	
	// Rotation matrix for isometric rotations (y 45°, x 35.26°)
	var isoM = utils.multiplyMatrices(utils.MakeRotateXMatrix(35.26), utils.MakeRotateYMatrix(45));

	return utils.multiplyMatrices(createPort(w, a , f, n), isoM);
}

function resolutionMatrixE2() {
	// Make a dimetric view, w = 50, a = 16/9, n = 1, f = 101, rotated 20 around the x-axis
	var w = 50;
	var a = 16/9;
	var n = 1;
	var f = 101;

	// Rotation matrix for dimetric rotations (y 45°, x 20°)
	var dimM = utils.multiplyMatrices(utils.MakeRotateXMatrix(20), utils.MakeRotateYMatrix(45));

	return utils.multiplyMatrices(createPort(w, a , f, n), dimM);
}

function resolutionMatrixE3() {
	// Make a trimetric view, w = 50, a = 16/9, n = 1, f = 101, 
	// rotated -30 around the x-axis and 30 around the y-axis
	var w = 50;
	var a = 16/9;
	var n = 1;
	var f = 101;

	// Rotation matrix for trimetric rotations (y 30°, x -30°)
	var dimM = utils.multiplyMatrices(utils.MakeRotateXMatrix(-30), utils.MakeRotateYMatrix(30));

	return utils.multiplyMatrices(createPort(w, a , f, n), dimM);
}

function resolutionMatrixE4() {
	// Make an cavalier projection view, w = 50, a = 16/9, n = 1, f = 101, at 45 degrees
	var w = 50;
	var a = 16/9;
	var n = 1;
	var f = 101;

	// Cavalier projection matrix
	var p = 1;
	var alfa = utils.degToRad(45);
	var cavM = utils.MakeShearZMatrix(-p * Math.cos(alfa), -p * Math.sin(alfa));

	return utils.multiplyMatrices(createPort(w, a , f, n), cavM);
}

function resolutionMatrixE5() {
	// Make a cabinet projection view, w = 50, a = 16/9, n = 1, f = 101, at 60 degrees
	var w = 50;
	var a = 16/9;
	var n = 1;
	var f = 101;

	// Cavalier projection matrix
	var p = 0.5;
	var alfa = utils.degToRad(60);
	var cavM = utils.MakeShearZMatrix(-p * Math.cos(alfa), -p * Math.sin(alfa));

	return utils.multiplyMatrices(createPort(w, a , f, n), cavM);
}