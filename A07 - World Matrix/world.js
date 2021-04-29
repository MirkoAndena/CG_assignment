function world() {
	
	var A1 = resulutionMatrixE1();
	var A2 = resulutionMatrixE2();
	var A3 = resulutionMatrixE3();
	var A4 = resulutionMatrixE4();
	var A5 = resulutionMatrixE5();

	return [A1, A2, A3, A4, A5];
}

function resulutionMatrixE1() {
	// Positioned in 0,0,-3. Yaw=90, Pitch and Roll = 0
	var T = utils.MakeTranslateMatrix(0, 0, -3);
	var Ry = utils.MakeRotateYMatrix(90);

	return utils.multiplyMatrices(T, Ry);
}

function resulutionMatrixE2() {
	// Positioned in 0,2,0. Yaw=0, Pitch = 60, Roll = 0, 1/10th of size
	var T = utils.MakeTranslateMatrix(0, 2, 0);
	var Rx = utils.MakeRotateXMatrix(60);
	var S = utils.MakeScaleMatrix(1/10);

	return utils.multiplyMatrices(T, utils.multiplyMatrices(Rx, S));
}

function resulutionMatrixE3() {
	// Positioned in 0,0,0. Yaw=30, Pitch = 0 Roll = 45
	var Ry = utils.MakeRotateYMatrix(30);
	var Rz = utils.MakeRotateZMatrix(45);
	
	return utils.multiplyMatrices(Ry, Rz);
}

function resulutionMatrixE4() {
	// Positioned in 2,0,2. Yaw=180, Pitch and Roll = 0, two times wider
	var T = utils.MakeTranslateMatrix(2, 0, 2);
	var Ry = utils.MakeRotateYMatrix(180);
	var S = utils.MakeScaleNuMatrix(2, 1, 1);

	return utils.multiplyMatrices(T, utils.multiplyMatrices(Ry, S));
}

function resulutionMatrixE5() {
	// Positioned in 1,-1,2.5. Yaw=-30, Pitch = 45 Roll = -15, 
	// Scaled with the following factors: 0.8 (x), 0.75 (y), 1.2 (z)
	var T = utils.MakeTranslateMatrix(1, -1, 2.5);
	var Rx = utils.MakeRotateXMatrix(45);
	var Ry = utils.MakeRotateYMatrix(-30);
	var Rz = utils.MakeRotateZMatrix(-15);
	var S = utils.MakeScaleNuMatrix(0.8, 0.75, 1.2);

	return utils.multiplyMatrices(T, utils.multiplyMatrices(Ry, utils.multiplyMatrices(Rx, utils.multiplyMatrices(Rz, S))));
}