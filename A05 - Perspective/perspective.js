function perspective() {

	var A1 = resolutionMatrixE1();
	var A2 = resolutionMatrixE2();
	var A3 = resolutionMatrixE3();
	var O1 = resolutionMatrixE4();
	var O2 = resolutionMatrixE5();

	return [A1, A2, A3, O1, O2];
}

function _createPpersp(t, b, r, l, n, f) {
	var Upersp = [n,  0,  0,  0,
				  0,  n,  0,  0,
				  0,  0,  n,  1,
				  0,  0, -1,  0];
	var Tpersp = utils.MakeTranslateMatrix((r + l)/-2, (t + b)/-2, ((1/n) - n + (1/f) - n)/-2);
	var Spersp = utils.MakeScaleNuMatrix(2 / (r - l), 2 / (t - b), 2 / ((1/f) - n - ((1/n) - n)));

	return utils.multiplyMatrices(Spersp, utils.multiplyMatrices(Tpersp, Upersp));
}

function createPpersp(fovY, a, n, f) {
	var t = n * Math.tan(fovY / 2);
	var b = -t;
	var r = a * t;
	var l = -r;

	return _createPpersp(t, b, r, l, n, f);
}

function resolutionMatrixE1() {
	// Make perspective projection, FoV-y = 70 deg, a = 16/9, n = 1, f = 101.
	var fovY = utils.degToRad(70);
	var a = 16/9;
	var n = 1;
	var f = 101;

	return createPpersp(fovY, a, n, f);
}

function resolutionMatrixE2() {
	// Make perspective projection, FoV-y = 105 deg, a = 16/9, n = 1, f = 101
	var fovY = utils.degToRad(105);
	var a = 16/9;
	var n = 1;
	var f = 101;

	return createPpersp(fovY, a, n, f);
}

function resolutionMatrixE3() {
	// Make perspective projection, FoV-y = 40 deg, a = 16/9, n = 1, f = 101
	var fovY = utils.degToRad(40);
	var a = 16/9;
	var n = 1;
	var f = 101;

	return createPpersp(fovY, a, n, f);
}

function resolutionMatrixE4() {
	// Make perspective projection, FoV-y = 90 deg, a = 4/3, n = 1, f = 101. 
	// Note: since the aspect ratio is not correct, the image should appear to be deformed
	var fovY = utils.degToRad(90);
	var a = 4/3;
	var n = 1;
	var f = 101;

	return createPpersp(fovY, a, n, f);
}

function resolutionMatrixE5() {
	// Make perspective projection, l = -1.2, r = 0, t = 0.3375, b = -0.3375, n = 1, f = 101. 
	// Note: due to the asimmetry of this projection, 
	// only the left part of the scene should be visible
	var t = 0.3375;
	var b = -0.3375;
	var r = 0;
	var l = -1.2;
	var n = 1;
	var f = 101;

	return _createPpersp(t, b, r, l, n, f);
}