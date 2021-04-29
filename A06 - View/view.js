function view() {
    
	var A1 = resolutionMatrixE1();
    var A2 = resolutionMatrixE2();
    var A3 = resolutionMatrixE3();
    var A4 = resolutionMatrixE4();

	return [A1, A2, A3, A4];
}

function resolutionMatrixE1() {
    // Make a Look-In-Direction matrix centered at (5,2.5,0), looking west and aiming 30 degrees down.
    var T = utils.MakeTranslateMatrix(-5, -2.5, 0);
    var Rx = utils.MakeRotateXMatrix(30);
    var Ry = utils.MakeRotateYMatrix(-90);
    return utils.multiplyMatrices(Rx, utils.multiplyMatrices(Ry, T));
}

function resolutionMatrixE2() {
    // Make a Look-In-Direction matrix centered at (0,-1,-5), angled 170 degrees, with an elevation of 15 degrees, and a roll of 45 degrees.
    var T = utils.MakeTranslateMatrix(0, 1, 5);
    var Rx = utils.MakeRotateXMatrix(-15);
    var Ry = utils.MakeRotateYMatrix(-170);
    var Rz = utils.MakeRotateZMatrix(-45);
    return utils.multiplyMatrices(Rz, utils.multiplyMatrices(Rx, utils.multiplyMatrices(Ry, T)));
}

function norm(v) {
    return Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2) + Math.pow(v[2], 2));
}

function createVz(c, a) {
    var d = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
    var d_norm = norm(d);
    return [d[0]/d_norm, d[1]/d_norm, d[2]/d_norm];
}

function createLookAtMatrix(c, a, u) {
    var vz = createVz(c, a);

    var vx = utils.crossVector(u, vz);
    var vx_norm = norm(vx);
    vx = [vx[0]/vx_norm, vx[1]/vx_norm, vx[2]/vx_norm];

    var vy = utils.crossVector(vz, vx);

    return [vx[0],		vx[1],		vx[2],		-vx[0]*c[0]-vx[1]*c[1]-vx[2]*c[2],
            vy[0],		vy[1],		vy[2],		-vy[0]*c[0]-vy[1]*c[1]-vy[2]*c[2],
            vz[0],		vz[1],		vz[2],		-vz[0]*c[0]-vz[1]*c[1]-vz[2]*c[2],
            0.0,		0.0,		0.0,		1.0];
}

function resolutionMatrixE3() {
    // Make a Look-At-Matrix, centered at (-4, 2, -4), aiming at (0,0.5,0.5) and with up-vector (0,1,0).
    var c = [-4, 2, -4];
    var a = [0, 0.5, 0.5];
    var u = [0, 1, 0];
    
    return createLookAtMatrix(c, a, u);
}

function resolutionMatrixE4() {
    // Make a Look-At-Matrix, centered at (2.57, 0, 0), aiming at (2.8,0,-1) and with up-vector (1,0,0).
    var c = [2.57, 0, 0];
    var a = [2.8, 0, -1];
    var u = [1, 0, 0];
    
    return createLookAtMatrix(c, a, u);
}