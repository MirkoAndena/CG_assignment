function move() {
	
	var R1 = solutionMatrixE1();
	var S1 = solutionMatrixE2();
	var S2 = solutionMatrixE3();
	var I1 =  solutionMatrixE4();

	return [R1, S1, S2, I1];
}

function compose2(m1, m2) {
	return utils.multiplyMatrices(m1, m2);
}

function compose3(m1, m2, m3) {
	return utils.multiplyMatrices(m1, utils.multiplyMatrices(m2, m3));
}

function goAndBack(M, req) {
	return compose3(M, req, utils.invertMatrix(M));
}

function solutionMatrixE1() {
	// Rotate 60 degrees around an arbitrary axis passing through (0,1,-1). 
	// The x-axis can be aligned to the arbitrary axis after a rotation of 45 degrees around the z-axis,
	// and then 15 degrees around the y-axis.
	var translation = utils.MakeTranslateMatrix(0, 1, -1);
	var rotationZ = utils.MakeRotateZMatrix(45);
	var rotationY = utils.MakeRotateYMatrix(15);

	var M = compose3(translation, rotationY, rotationZ);
	var requestedRotation = utils.MakeRotateXMatrix(60);
	
	return goAndBack(M, requestedRotation);
}

function solutionMatrixE2() {
	// Half the size of the object along a line that bisects the positive x and y axes on the xy-plane.
	var rotate = utils.MakeRotateZMatrix(45);
	var resize = utils.MakeScaleNuMatrix(0.5, 1, 1);
	return goAndBack(rotate, resize);
}

function solutionMatrixE3() {
	// Mirror the starship along a plane passing through (1,1,1), and obtained rotating 15 degree around the x axis the xz plane
	var translation = utils.MakeTranslateMatrix(1, 1, 1);
	var rotation = utils.MakeRotateXMatrix(15);

    var M = compose2(translation, rotation);

	return goAndBack(M, utils.MakeScaleNuMatrix(1, -1, 1));
}

function solutionMatrixE4() {
	// Apply the inverse of the following sequence of transforms: rotation of 30 degree around the Y axis then Translation of (0, 0, 5), 
	// and finally a uniform scaling of a factor of 3.
	var rotation = utils.MakeRotateYMatrix(30);
	var translation = utils.MakeTranslateMatrix(0, 0, 5);
	var scaling = utils.MakeScaleMatrix(3);
	
	var M = compose3(scaling, translation, rotation);
	return utils.invertMatrix(M);
}