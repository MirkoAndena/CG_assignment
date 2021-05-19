// Returns the transform matrix obtained interpolating the given positions and angles
function InterpMat(
				tx1, ty1, tz1, rx1, ry1, rz1,
			    tx2, ty2, tz2, rx2, ry2, rz2,
			    a) {
	// tx1, ty1, tz1	-> Initial position
	// rx1, ry1, rz1	-> Initial rotation (in Euler angles)
	// tx2, ty2, tz2	-> Final position
	// rx2, ry2, rz2	-> Final rotation (in Euler angles)
	// a (in 0..1 range)	-> Interpolation coefficient
	//
	// return the interpolated transform matrix with the given position and rotation
	
	// Rotation interpolation
	let initialRotation = createQuaternionFromEuler(rx1, ry1, rz1);
	let finalRotation = createQuaternionFromEuler(rx2, ry2, rz2);
	let rotation = initialRotation.slerp(finalRotation)(a);

	// Translation interpolation (LINEAR)
	let translation = utils.MakeTranslateMatrix(
		linearInterpolation(tx1, tx2, a),
		linearInterpolation(ty1, ty2, a),
		linearInterpolation(tz1, tz2, a)
	);

	return utils.multiplyMatrices(translation, rotation.toMatrix4());;			   
}

function createQuaternionFromEuler(x, y, z) {
	xr = utils.degToRad(x);
	yr = utils.degToRad(y);
	zr = utils.degToRad(z);
	return Quaternion.fromEuler(zr, xr, yr, order = "ZXY");
}

function linearInterpolation(i, f, a) {
	return (1 - a) * i + a * f;
}